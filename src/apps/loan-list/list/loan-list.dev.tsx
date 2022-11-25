import { withQuery } from "@storybook/addon-queryparams";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { configTypes } from "../../../core/utils/helpers/fetcher";
import { getModalIds } from "../../../core/utils/helpers/general";
import LoanList from "./loan-list.entry";

export default {
  title: "Apps / Loan list",
  component: LoanList,
  argTypes: {
    // Config
    feesPageUrl: {
      defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
      control: { type: "text" }
    },
    materialOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
      control: { type: "text" }
    },
    [configTypes.fbs]: {
      defaultValue: "",
      control: { type: "text" }
    },
    [configTypes.publizon]: {
      defaultValue: "",
      control: { type: "text" }
    },
    pageSizeDesktop: {
      defaultValue: 10,
      control: { type: "number" }
    },
    pageSizeMobile: {
      defaultValue: 5,
      control: { type: "number" }
    },
    // Texts
    groupModalDueDateLinkToPageWithFeesText: {
      control: {
        type: "text"
      },
      defaultValue: "Read more about fees"
    },
    groupModalDueDateRenewLoanCloseModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Close renew loans modal"
    },
    groupModalDueDateAriaDescriptionText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This modal groups loans after due date and makes it possible to renew said loans"
    },
    groupModalCheckboxText: {
      control: {
        type: "text"
      },
      defaultValue: "Choose all renewable"
    },
    groupModalDueDateHeaderText: {
      control: {
        type: "text"
      },
      defaultValue: "Due date @date"
    },
    groupModalDueDateWarningLoanOverdueText: {
      control: {
        type: "text"
      },
      defaultValue:
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
    },
    loanListAriaLabelListButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "This button shows all loans in the list"
    },
    loanListAriaLabelStackButtonText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This button filters the list, so only one the materials that have the same due date is shown"
    },
    groupModalRenewLoanDeniedInterLibraryLoanText: {
      control: {
        type: "text"
      },
      defaultValue:
        "The item has been lent to you by another library and renewal is therefore conditional of the acceptance by that library"
    },
    groupModalRenewLoanDeniedMaxRenewalsReachedText: {
      control: {
        type: "text"
      },
      defaultValue: "The item cannot be renewed further "
    },
    groupModalRenewLoanDeniedReservedText: {
      control: {
        type: "text"
      },
      defaultValue: "The item is reserved by another patron"
    },
    loanListDigitalLoansEmptyListText: {
      control: {
        type: "text"
      },
      defaultValue: "You have no digital loans at the moment"
    },
    loanListDigitalLoansTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Digital loans"
    },
    loanListDigitalPhysicalLoansEmptyListText: {
      control: {
        type: "text"
      },
      defaultValue: "You have 0 loans at the moment"
    },
    loanListDueDateModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This button opens a modal that covers the entire page and contains loans with the same due date as the loan currently in focus"
    },
    groupModalHiddenLabelCheckboxOnMaterialText: {
      control: {
        type: "text"
      },
      defaultValue: "Select material for renewal"
    },
    loanListMaterialLateFeeText: {
      control: {
        type: "text"
      },
      defaultValue: "You will be charged a fee, when the item is returned"
    },
    loanListMaterialDaysText: {
      control: {
        type: "text"
      },
      defaultValue: '{"type":"plural","text":["1 day","@count days"]}'
    },
    loanListAdditionalMaterialsText: {
      control: {
        type: "text"
      },
      defaultValue:
        '{"type":"plural","text":["+ 1 other material","+ @count other materials"]}'
    },
    loanListPhysicalLoansEmptyListText: {
      control: {
        type: "text"
      },
      defaultValue: "You have no physical loans at the moment"
    },
    loanListPhysicalLoansTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Physical loans"
    },
    loanListRenewMultipleButtonExplanationText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This button opens a modal that covers the entire page and contains loans with different due dates, if some of the loans in the modal are renewable you can renew them"
    },
    loanListRenewMultipleButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "Renew several"
    },
    loanListStatusBadgeDangerText: {
      control: {
        type: "text"
      },
      defaultValue: "Expired"
    },
    loanListStatusBadgeWarningText: {
      control: {
        type: "text"
      },
      defaultValue: "Expiring soon"
    },
    loanListStatusCircleAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue:
        '{"type":"plural","text":["This material is due in one day","This material is due in @count days"]}'
    },
    loanListTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Your loans"
    },
    loanListToBeDeliveredDigitalMaterialText: {
      control: {
        type: "text"
      },
      defaultValue: "Due date @count"
    },
    groupModalDueDateMaterialText: {
      control: {
        type: "text"
      },
      defaultValue: "Afleveres @count"
    },
    loanListToBeDeliveredText: {
      control: {
        type: "text"
      },
      defaultValue: "Due date @count"
    },
    materialAndAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "and"
    },
    materialByAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "By"
    },
    materialDetailsCloseModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Close material details modal"
    },
    materialDetailsDueDateLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Afleveres"
    },
    materialDetailsLinkToPageWithFeesText: {
      control: {
        type: "text"
      },
      defaultValue: "Read more about fees"
    },
    materialDetailsLoanDateLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Loan date"
    },
    materialDetailsMaterialNumberLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Material Item Number"
    },
    materialDetailsModalAriaDescriptionText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This modal shows material details, and makes it possible to renew a material, of that material is renewable"
    },
    materialDetailsOverdueText: {
      control: {
        type: "text"
      },
      defaultValue: "Expired"
    },
    materialDetailsRenewLoanButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "Renew your loans"
    },
    materialDetailsWarningLoanOverdueText: {
      control: {
        type: "text"
      },
      defaultValue:
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
    },
    publizonAudioBookText: {
      control: {
        type: "text"
      },
      defaultValue: "Audiobook"
    },
    publizonEbookText: {
      control: {
        type: "text"
      },
      defaultValue: "E-book"
    },
    publizonPodcastText: {
      control: {
        type: "text"
      },
      defaultValue: "Podcast"
    },
    groupModalAriaDescriptionText: {
      control: {
        type: "text"
      },
      defaultValue: "This modal makes it possible to renew materials"
    },
    groupModalButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "Renewable (@count)"
    },
    groupModalCloseModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Close modal with grouped loans"
    },
    groupModalHeaderText: {
      control: {
        type: "text"
      },
      defaultValue: "Renew several"
    },
    resultPagerStatusText: {
      defaultValue: "Showing @itemsShown out of @hitcount loans",
      control: { type: "text" }
    },
    showMoreText: {
      defaultValue: "show more",
      control: { type: "text" }
    }
  },
  decorators: [withQuery]
} as ComponentMeta<typeof LoanList>;

const Template: ComponentStory<typeof LoanList> = (props) => (
  <LoanList {...props} />
);

export const LoanListEntry = Template.bind({});
LoanListEntry.args = {};

export const LoanListDetailsModal = Template.bind({});
LoanListDetailsModal.parameters = {
  query: {
    modal: "28847238"
  }
};

export const LoanListDueDateModal = Template.bind({});
LoanListDueDateModal.parameters = {
  query: {
    modal: "2022-09-16"
  }
};

const { allLoansId } = getModalIds();
export const LoanListRenewLoansModal = Template.bind({});
LoanListRenewLoansModal.parameters = {
  query: {
    modal: allLoansId
  }
};
