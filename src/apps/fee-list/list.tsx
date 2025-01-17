import React, { FC, ReactNode } from "react";
import ListHeader from "../../components/list-header/list-header";
import { FeeV2 } from "../../core/fbs/model";
import StackableFees from "./stackable-fees/stackable-fees";
import { FaustId } from "../../core/utils/types/ids";

interface ListProps {
  openDetailsModalClickEvent: (feeId: number) => void;
  fees: FeeV2[] | null;
  dataCy: string;
  listHeader: ReactNode;
  totalText: string;
  className?: string;
  alreadyPaidText: string;
}
const List: FC<ListProps> = ({
  openDetailsModalClickEvent,
  fees,
  listHeader,
  dataCy,
  totalText,
  className,
  alreadyPaidText
}) => {
  return (
    <div>
      {fees && (
        <div className={className} data-cy={dataCy}>
          <ListHeader header={listHeader} amount={fees.length} />
          {fees.map((itemData) => (
            <StackableFees
              amountOfMaterialsWithDueDate={itemData.materials.length}
              item={{ faust: itemData.materials[0].recordId as FaustId }}
              materialItemNumber={itemData.materials[0].materialItemNumber}
              feeData={itemData}
              openDetailsModalClickEvent={openDetailsModalClickEvent}
            />
          ))}
          <div className="fee-list-bottom">
            <div className="fee-list-bottom__paymenttypes" />
            <div className="fee-list-bottom__actions">
              <p className="text-small-caption color-secondary-gray">
                {alreadyPaidText}
              </p>
              <p className="text-body-small-medium mt-16">{totalText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
