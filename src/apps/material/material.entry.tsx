import * as React from "react";
import { withText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import Material from "./material";

interface MaterialEntryTextProps {
  materialHeaderAuthorByText: string;
  periodikumSelectYearText: string;
  periodikumSelectWeekText: string;
  reserveBookText: string;
  findOnBookshelfText: string;
  descriptionHeadlineText: string;
  identifierText: string;
  inSeriesText: string;
  inSameSeriesText: string;
  numberDescriptionText: string;
  loginToSeeReviewText: string;
  cantViewReviewText: string;
  ratingIsText: string;
  outOfText: string;
  heartsIconText: string;
  detailsOfTheMaterialText: string;
  reserveText: string;
  editionsText: string;
  detailsText: string;
  typeText: string;
  languageText: string;
  contributorsText: string;
  originalTitleText: string;
  isbnText: string;
  editionText: string;
  scopeText: string;
  publisherText: string;
  audienceText: string;
  fictionNonfictionText: string;
}

export interface MaterialEntryProps extends MaterialEntryTextProps {
  pid: Pid;
  searchUrl: string;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid, searchUrl }) => {
  return <Material pid={pid} searchUrl={searchUrl} />;
};

export default withText(MaterialEntry);