package com.vaadin.demo.component.gridpro;

import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("grid-pro-cell-editability")
public class GridProCellEditability extends Div {
    public GridProCellEditability() {
        GridPro<Transaction> grid = new GridPro<>();
        grid.setItems(new Transaction("Transaction 1", 100, true),
                new Transaction("Transaction 2", 200, false));
        grid.addEditColumn(Transaction::getName).text(Transaction::setName)
                .setHeader("Name");
        // tag::snippet[]
        grid.addEditColumn(Transaction::getAmount)
                .withCellEditableProvider(
                        transaction -> !transaction.isApproved())
                .text((item, value) -> item.setAmount(Integer.parseInt(value)))
                .setHeader("Amount");
        grid.addEditColumn(Transaction::isApproved)
                .withCellEditableProvider(
                        transaction -> !transaction.isApproved())
                .checkbox(Transaction::setApproved)
                .setHeader("Approved");
        // end::snippet[]
        add(grid);
    }

    public static class Transaction {
        private String name;
        private int amount;
        private boolean approved;

        public Transaction(String name, int amount, boolean approved) {
            this.name = name;
            this.amount = amount;
            this.approved = approved;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAmount() {
            return amount;
        }

        public void setAmount(int amount) {
            this.amount = amount;
        }

        public boolean isApproved() {
            return approved;
        }

        public void setApproved(boolean approved) {
            this.approved = approved;
        }
    }

    public static class Exporter extends DemoExporter<GridProCellEditability> { // hidden-source-line
    } // hidden-source-line
}
