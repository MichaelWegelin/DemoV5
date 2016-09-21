/*global location */
sap.ui.define([
	"de/wegelin/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, MessageBox) {
	"use strict";

	return BaseController.extend("de.wegelin.controller.Edit", {


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			this.getRouter().getRoute("edit").attachPatternMatched(this._onObjectMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onSave: function() {
			var oDataModel = this.getOwnerComponent().getModel();
			var oNewBusinessPartner = this.getModel("newSupplier").getData();
			
			// this seems to be buggy:
			// var sPath = "/BusinessPartnerSet('" + oNewBusinessPartner.BpId + "')";
			// var bSuccess = oDataModel.setProperty(sPath,oNewBusinessPartner);
			// thereforre we use this workaround:
			var sPath = "BusinessPartnerSet('" + oNewBusinessPartner.BpId + "')";
			oDataModel.oData[sPath] = oNewBusinessPartner;
			sPath = "/" + sPath;
			// end of workaround
			
			oDataModel.update(
				sPath,
				oNewBusinessPartner,
				{
					success: function() {
						MessageBox.success("Data have been saved.");
						oDataModel.refresh();
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
		_onObjectMatched: function(oEvent) {
			var sBpId = oEvent.getParameter("arguments").objectId;
			var sPath = "/BusinessPartnerSet('" + sBpId + "')";
			var oNewSupplier = jQuery.extend(true,{}, this.getOwnerComponent().getModel().getObject(sPath));
			var oNewSupplierModel = new JSONModel(oNewSupplier);
			this.setModel(oNewSupplierModel, "newSupplier");
		}

	});

});