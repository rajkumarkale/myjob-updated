var module = angular.module('com.module.possibility');
module.factory('SLATrackerModel', function () {
    function SLATracker(modelData) {
        this.agreementStartDate = modelData.agreementStartDate;
        this.agreementEndDate = modelData.agreementEndDate;
        this.agreementTerminationNotice = modelData.agreementTerminationNotice;
        this.associateTerminationNotice = modelData.associateTerminationNotice;
        this.paymentMode = modelData.paymentMode;
        this.timeSheetReminder = modelData.timeSheetReminder;
        this.timeSheetSubmissionCutoff = modelData.timeSheetSubmissionCutoff;
        this.payrollInputUploadDate = modelData.payrollInputUploadDate;
        this.invoiceSubmissionDate = modelData.invoiceSubmissionDate
        this.payoutDate = modelData.payoutDate;
        this.creditTerms = modelData.creditTerms;
        this.commercials = modelData.commercials;
        this.fixedTee = modelData.fixedTee;
        this.sourcingFee = modelData.sourcingFee;
        this.absorptionFeeAndClauses = modelData.absorptionFeeAndClauses;
        this.timeSheetAttendanceRelated = modelData.timeSheetAttendanceRelated;
        this.attendenceCollectionProcess = modelData.attendenceCollectionProcess;
        this.activityOwner = modelData.activityOwner;
        this.salaryPayout = modelData.salaryPayout;
        this.invoiceSubmissionAndPaymentFollowup = modelData.invoiceSubmissionAndPaymentFollowup;
        this.po = modelData.po;
        this.disputesAndResolution = modelData.disputesAndResolution;
        this.payrollAndInvoice = modelData.payrollAndInvoice;
        this.leaves = modelData.leaves;
        this.billingAndInvoiceProcess = modelData.billingAndInvoiceProcess;
        this.poAndInvoiceRelated = modelData.poAndInvoiceRelated;
        this.discounts = modelData.discounts;
        this.billingOfficeAddress = modelData.billingOfficeAddress;
        this.shippingOfficeAdress = modelData.shippingOfficeAdress;
        this.billingAndInvoiceProcess = modelData.billingAndInvoiceProcess;
    }
    return SLATracker;
});