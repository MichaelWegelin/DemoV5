jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.require("sap.ui.test.Opa5");

jQuery.sap.require("de.wegelin.test.integration.pages.Common");
jQuery.sap.require("de.wegelin.test.integration.pages.App");
jQuery.sap.require("de.wegelin.test.integration.pages.Browser");
jQuery.sap.require("de.wegelin.test.integration.pages.Master");
jQuery.sap.require("de.wegelin.test.integration.pages.Detail");
jQuery.sap.require("de.wegelin.test.integration.pages.NotFound");

sap.ui.test.Opa5.extendConfig({
	arrangements: new de.wegelin.test.integration.pages.Common(),
	viewNamespace: "de.wegelin.view."
});

jQuery.sap.require("de.wegelin.test.integration.NavigationJourneyPhone");
jQuery.sap.require("de.wegelin.test.integration.NotFoundJourneyPhone");
jQuery.sap.require("de.wegelin.test.integration.BusyJourneyPhone");