import { useVuuMenuActions } from "@finos/vuu-data-react";
import { getSchema, vuuModule, VuuTableName } from "@finos/vuu-data-test";
import { ContextMenuProvider, DialogProvider } from "@finos/vuu-popups";
import { Table, TableProps } from "@finos/vuu-table";
import { applyDefaultColumnConfig } from "@finos/vuu-utils";
import { useMemo } from "react";
import { DemoTableContainer } from "./DemoTableContainer";

let displaySequence = 1;

const BulkEditTableTemplate = ({
  table = "instruments",
}: {
  table?: VuuTableName;
}) => {
  const schema = getSchema(table);

  const tableProps = useMemo<Pick<TableProps, "config" | "dataSource">>(
    () => ({
      config: {
        columns: applyDefaultColumnConfig(schema),
      },
      dataSource: vuuModule("SIMUL").createDataSource(table),
    }),
    [schema, table]
  );

  const { buildViewserverMenuOptions, handleMenuAction } = useVuuMenuActions({
    dataSource: tableProps.dataSource,
  });

  return (
    <ContextMenuProvider
      menuActionHandler={handleMenuAction}
      menuBuilder={buildViewserverMenuOptions}
    >
      <DemoTableContainer>
        <Table {...tableProps} />
      </DemoTableContainer>
    </ContextMenuProvider>
  );
};

export const BulkEditTable = () => {
  return (
    <DialogProvider>
      <BulkEditTableTemplate />
    </DialogProvider>
  );
};
BulkEditTable.displaySequence = displaySequence++;
