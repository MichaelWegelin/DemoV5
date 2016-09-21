/*global location */
sap.ui.define([
	"de/wegelin/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, MessageBox) {
	"use strict";

	return BaseController.extend("de.wegelin.controller.Create", {


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			this.getRouter().getRoute("create").attachPatternMatched(this._onObjectMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onSave: function() {
			var oDataModel = this.getOwnerComponent().getModel();
			var oNewBusinessPartner = this.getModel("newSupplier").getData();
			oDataModel.create(
				"/BusinessPartnerSet",
				oNewBusinessPartner,
				{
					success: function() {
						MessageBox.success("New supplier has been saved.");
					},
					error: function(error) { 
						MessageBox.error(error.message);
					}	
				}
			);
		},
		
		onCancel: function() {
			this.onNavBack();
		},
		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function() {
			var oNewSupplier = {
				CompanyName: "",
				LegalForm: "",
				Street: "",
				Building: "",
				City: "",
				Country: "DE",
				PostalCode: "",
				EmailAddress: "",
				PhoneNumber: "",
				FaxNumber: "",
				WebAddress: "",
				CurrencyCode: "EUR",
				BpRole: "02",
				AddressType: "02",
				AddressValStartDate: new Date(),
				AddressValEndDate: new Date((new Date()).setYear(2020))
			};
			var oNewSupplierModel = new JSONModel(oNewSupplier);
			this.setModel(oNewSupplierModel, "newSupplier");
		}

	});

});