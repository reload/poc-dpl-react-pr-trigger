import React, { FC, useEffect, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import { useText } from "../../../core/utils/text";
import { AgencyBranch } from "../../../core/fbs/model";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  getColors,
  daysBetweenTodayAndDate
} from "../../../core/utils/helpers/general";
import { formatDate } from "../../loan-list/utils/helpers";
import {
  getPreferredBranch,
  excludeBlacklistedBranches
} from "../../../components/reservation/helper";
import ReservationStatus from "./reservation-status";
import { useConfig } from "../../../core/utils/config";

interface ReservationInfoProps {
  reservationInfo: ReservationType;
}

const ReservationInfo: FC<ReservationInfoProps> = ({ reservationInfo }) => {
  const t = useText();

  const {
    state,
    expiryDate,
    pickupBranch,
    numberInQueue,
    pickupDeadline,
    pickupNumber
  } = reservationInfo;

  // const [readyForPickupLabel, setReadyForPickupLabel] = useState<string>("");
  const [pickupLibrary, setPickupLibrary] = useState<string>("");
  const { success } = getColors();

  let readyForPickupLabel = "";
  if (pickupDeadline) {
    readyForPickupLabel = pickupBranch
      ? t("reservationPickUpLatestText", {
          placeholders: { "@date": formatDate(pickupDeadline) }
        })
      : t("reservationListLoanBeforeText", {
          placeholders: { "@date": formatDate(pickupDeadline) }
        });
  }

  const config = useConfig();
  // Get library branches from config
  const inputBranches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });

  // Get the library branches where the user cannot pick up books at
  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });

  // Remove the branches where the user cannot pick up books from the library branches
  let branches = inputBranches;
  if (Array.isArray(blacklistBranches)) {
    branches = excludeBlacklistedBranches(inputBranches, blacklistBranches);
  }

  useEffect(() => {
    if (branches && pickupBranch) {
      setPickupLibrary(getPreferredBranch(pickupBranch, branches));
    }
  }, [branches, pickupBranch, pickupDeadline, t]);

  if (state === "readyForPickup") {
    return (
      <ReservationStatus
        color={success as string}
        percent={100}
        infoLabel={readyForPickupLabel}
        label={[pickupLibrary, pickupNumber || ""]}
      >
        <div className="counter__value" aria-hidden="true">
          <img src={check} alt="" />
          <span className="counter__label">
            {t("reservationListReadyText")}
          </span>
        </div>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && pickupBranch && numberInQueue && expiryDate) {
    const numberInLineLabel =
      numberInQueue === 1
        ? t("reservationListFirstInQueueText")
        : t("reservationListNumberInQueueText", {
            placeholders: { "@count": numberInQueue - 1 }
          });

    return (
      <ReservationStatus
        // The decision regarding this is, that if the user is number 4
        // in the queue for a material, the "percent-wheel-thing" should be 1/4 full.
        percent={(1 / numberInQueue) * 100}
        label={numberInLineLabel}
      >
        {/* I am not using string interpolation here because of styling */}
        {/* if somehow it is possible to break text in one div into two lines */}
        {/* where the first line has another font size AND is only the first "word" */}
        {/* then this should be changed to do that */}
        <span className="counter__value" aria-hidden="true">
          {numberInQueue}
        </span>
        <span className="counter__label" aria-hidden="true">
          {t("reservationListInQueueText")}
        </span>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && !pickupBranch && pickupDeadline) {
    const daysBetweenTodayAndPickup = daysBetweenTodayAndDate(pickupDeadline);
    return (
      <ReservationStatus
        percent={daysBetweenTodayAndDate(pickupDeadline) / 100}
        label={t("reservationListAvailableInText", {
          placeholders: { "@count": daysBetweenTodayAndDate(pickupDeadline) }
        })}
      >
        <span className="counter__value" aria-hidden="true">
          {/* I am not using string interpolation here because of styling */}
          {/* if somehow it is possible to break text in one div into two lines */}
          {/* where the first line has another font size AND is only the first "word" */}
          {/* then this should be changed to do that */}
          {daysBetweenTodayAndDate(pickupDeadline) > 0
            ? daysBetweenTodayAndPickup
            : 0}{" "}
        </span>
        <span className="counter__label" aria-hidden="true">
          {daysBetweenTodayAndPickup === 1
            ? t("reservationListDayText")
            : t("reservationListDaysText")}
        </span>
      </ReservationStatus>
    );
  }

  return <div />;
};

export default ReservationInfo;
