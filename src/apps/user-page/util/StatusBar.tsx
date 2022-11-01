import React, { useEffect, useState, FC } from "react";
import { useGetV1LibraryProfile } from "../../../core/publizon/publizon";
import { LibraryProfile } from "../../../core/publizon/model";
import { useText } from "../../../core/utils/text";

const StatusBar: FC = () => {
  const t = useText();
  const { data: libraryProfileFetched } = useGetV1LibraryProfile();
  const [libraryProfile, setLibraryProfile] = useState<LibraryProfile | null>(
    null
  );

  useEffect(() => {
    if (libraryProfileFetched) {
      setLibraryProfile(libraryProfileFetched);
    }
  }, [libraryProfileFetched]);

  // Todo where do I get these numbers from?
  const userEbookLoans = 1;
  const userAudioBookLoans = 4;
  const userEbookReservations = 1;
  const userAudioBookReservations = 2;
  let eBookLoanPerent = 100;
  if (libraryProfile?.maxConcurrentEbookLoansPerBorrower) {
    eBookLoanPerent =
      (userEbookLoans / libraryProfile.maxConcurrentEbookLoansPerBorrower) *
      100;
  }
  let audioBookLoanPercent = 100;
  if (libraryProfile?.maxConcurrentAudioLoansPerBorrower) {
    audioBookLoanPercent =
      (userAudioBookLoans / libraryProfile.maxConcurrentAudioLoansPerBorrower) *
      100;
  }

  let eBookReservationPerent = 100;
  if (libraryProfile?.maxConcurrentEbookReservationsPerBorrower) {
    eBookReservationPerent =
      (userEbookReservations /
        libraryProfile.maxConcurrentEbookReservationsPerBorrower) *
      100;
  }
  let audioBookReservationPercent = 100;
  if (libraryProfile?.maxConcurrentAudioReservationsPerBorrower) {
    audioBookReservationPercent =
      (userAudioBookReservations /
        libraryProfile.maxConcurrentAudioReservationsPerBorrower) *
      100;
  }
  return (
    <div className="dpl-status-loans">
      {libraryProfile && (
        <>
          <h2 className="text-body-small-regular mt-32 mb-16">
            {t("userPageStatusBarHeaderText")}
          </h2>
          <div className="text-body-small-regular">
            {t("userPageStatusBarBreadText")}
            <a href="todo" className="text-links">
              {t("userPageStatusBarLinkText")}
            </a>
          </div>
          <div className="dpl-status-loans__column">
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">
                {t("userPageStatusBarLoanHeaderText")}
              </h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("userPageStatusBarLoansEbooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {userEbookLoans} ud af{" "}
                    {libraryProfile.maxConcurrentEbookLoansPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${eBookLoanPerent}%` }}
                  />
                </div>
              </div>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("userPageStatusBarLoansAudioBooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {userAudioBookLoans} ud af{" "}
                    {libraryProfile.maxConcurrentAudioLoansPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${audioBookLoanPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">
                {t("userPageStatusBarReservationHeaderText")}
              </h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("userPageStatusBarReservationsEbooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {userEbookReservations} ud af{" "}
                    {libraryProfile.maxConcurrentEbookReservationsPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${eBookReservationPerent}%` }}
                  />
                </div>
              </div>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("userPageStatusBarReservationsAudioBooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {userAudioBookReservations} ud af{" "}
                    {libraryProfile.maxConcurrentAudioReservationsPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${audioBookReservationPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusBar;
