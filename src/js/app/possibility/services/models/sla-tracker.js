var module = angular.module('com.module.possibility');
module.factory('SLATrackerModel', function (PointOfContactModel) {
    function SLATracker(modelData) {
        this.agreementAndImportantDates = {};
        if (modelData.agreementAndImportantDates) {
            this.agreementAndImportantDates = {
                agreementStartDate: modelData.agreementAndImportantDates.agreementStartDate,
                agreementEndDate: modelData.agreementAndImportantDates.agreementEndDate,
                agreementTerminationNotice: modelData.agreementAndImportantDates.agreementTerminationNotice,
                associateTerminationNotice: modelData.agreementAndImportantDates.associateTerminationNotice,
                paymentMode: modelData.agreementAndImportantDates.paymentMode,
                timeSheetReminder: modelData.agreementAndImportantDates.timeSheetReminder,
                timeSheetSubmissionCutoff: modelData.agreementAndImportantDates.timeSheetSubmissionCutoff,
                payrollInputUploadDate: modelData.agreementAndImportantDates.payrollInputUploadDate,
                invoiceSubmissionDate: modelData.agreementAndImportantDates.invoiceSubmissionDate,
                payoutDate: modelData.agreementAndImportantDates.payoutDate,
                creditTerms: modelData.agreementAndImportantDates.creditTerms
            };
        }
        this.commercials = {};
        if (modelData.commercials) {
            this.commercials = {
                fixedFee: modelData.commercials.fixedFee,
                reimbursementsServiceFee: modelData.commercials.reimbursementsServiceFee,
                sourcingFee: modelData.commercials.sourcingFee,
                absorptionFee: modelData.commercials.absorptionFee
            };
        }
        this.timeSheetAttendanceRelated = {};
        if (modelData.timeSheetAttendanceRelated) {
            this.timeSheetAttendanceRelated = {
                attendanceCycle: modelData.timeSheetAttendanceRelated.attendanceCycle,
                attendenceCollectionProcess: modelData.timeSheetAttendanceRelated.attendenceCollectionProcess
            };
        }
        this.activityOwner = {};
        if (modelData.activityOwner) {
            this.activityOwner = {
                timeSheeetAndPayroll: modelData.activityOwner.timeSheeetAndPayroll,
                salaryPayout: modelData.activityOwner.salaryPayout,
                invoiceSubmissionAndPaymentFollowup: modelData.activityOwner.invoiceSubmissionAndPaymentFollowup,
                po: modelData.activityOwner.po,
                disputesAndResolution: modelData.activityOwner.disputesAndResolution
            };
        }
        this.payrollAndInvoice = {};
        if (modelData.payrollAndInvoice) {
            this.payrollAndInvoice = {
                payrollCycle: modelData.payrollAndInvoice.payrollCycle,
                leaves: modelData.payrollAndInvoice.leaves,
                billingAndInvoiceProcess: modelData.payrollAndInvoice.billingAndInvoiceProcess
            };
        }
        this.poAndInvoiceRelated = {};
        if (modelData.poAndInvoiceRelated) {
            this.poAndInvoiceRelated = {
                poProcess: modelData.poAndInvoiceRelated.poProcess,
                discounts: modelData.poAndInvoiceRelated.discounts,
                billingOfficeAddress: modelData.poAndInvoiceRelated.billingOfficeAddress,
                shippingOfficeAdress: modelData.poAndInvoiceRelated.shippingOfficeAdress
            };
        }

        this.clientEscalationMatrix = [];
        if (modelData && modelData.clientEscalationMatrix) {
            this.clientEscalationMatrix = modelData.clientEscalationMatrix.map(function (contact) {
                return new PointOfContactModel(contact);
            })
        }

        this.bgv = modelData.bgv;
        this.insurance = modelData.insurance;
        this.familiyAndIndividual = modelData.familiyAndIndividual;
        this.gpa = modelData.gpa;
        this.pricingValue = modelData.pricingValue;
        this.creditDays = modelData.creditDays;
        this.payCycle = modelData.payCycle;
        this.billCycle = modelData.billCycle;
    }

    return SLATracker;
});