import React, { FC, useState, useEffect } from "react";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { tallyUpFees } from "../../../core/utils/helpers/general";
import Link from "../../../components/atoms/links/Link";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import WarningBar from "../../loan-list/materials/utils/warning-bar";
import { FeeV2 } from "../../../core/fbs/model/feeV2";

const DashboardFees: FC = () => {
  const t = useText();
  const u = useUrls();

  const feesPageUrl = u("feesPageUrl");
  const { data: fbsFees = [] } = useGetFeesV2<FeeV2[]>({
    includepaid: false,
    includenonpayable: true
  });

  const [feeCount, setFeeCount] = useState<number>(0);
  const [totalFeeAmount, setTotalFeeAmount] = useState<string>("0");

  useEffect(() => {
    if (fbsFees && Array.isArray(fbsFees)) {
      setFeeCount(fbsFees.length);
      setTotalFeeAmount(tallyUpFees(fbsFees));
    }
  }, [fbsFees, feeCount, totalFeeAmount]);

  return (
    <div className="fee-container">
      {fbsFees && !!feeCount && (
        <div>
          <div className="status-userprofile__column my-16">
            <div className="link-filters">
              <div className="link-filters__tag-wrapper">
                <h2 data-cy="dashboard-fees-header">
                  <Link
                    href={feesPageUrl}
                    className="link-tag link-tag link-filters__tag"
                  >
                    {t("feesText")}
                  </Link>
                  <span className="link-filters__counter">{feeCount}</span>
                </h2>
              </div>
            </div>
            <WarningBar
              overdueText={`${t("totalOwedText")} ${t("totalAmountFeeText", {
                placeholders: { "@total": totalFeeAmount }
              })}`}
              rightButtonText={t("dashboardSeeMoreFeesText")}
              rightButtonAriaLabelText={t("dashboardSeeMoreFeesAriaLabelText")}
              rightLink={feesPageUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardFees;
