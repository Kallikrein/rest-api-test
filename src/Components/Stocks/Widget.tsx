import React from "react";
import { Card, styled } from "@material-ui/core";

// const style = { flexGrow: 1, height: 400 } as const;

const WidgetCard = styled(Card)(({ theme }) => ({
  flexGrow: 1,
  height: 500,
  padding: theme.spacing(1)
}));

export const StocksWidget: React.FC = ({ children }) => (
  <WidgetCard>{children}</WidgetCard>
);
