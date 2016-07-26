var module = angular.module('com.module.possibility');
module.factory('SLATrackerModel', function (PointOfContactModel) {
    function SLATracker(modelData) {
      this.agreementAndImportantDates = {
      agreementStartDate : modelData.agreementStartDate,
      agreementEndDate : modelData.agreementEndDate,
      agreementTerminationNotice : modelData.agreementTerminationNotice,
      associateTerminationNotice : modelData.associateTerminationNotice,
      paymentMode : modelData.paymentMode,
      timeSheetReminder : modelData.timeSheetReminder,
      timeSheetSubmissionCutoff : modelData.timeSheetSubmissionCutoff,
      payrollInputUploadDate : modelData.payrollInputUploadDate,
      invoiceSubmissionDate : modelData.invoiceSubmissionDate,
      payoutDate : modelData.payoutDate,
      creditTerms : modelData.creditTerms
    };
        this.commercials = {
          fixedFee : modelData.fixedFee,
          reimbursementsServiceFee:modelData.reimbursementsServiceFee,
          sourcingFee : modelData.sourcingFee,
          absorptionFeeAndClauses : modelData.absorptionFeeAndClauses
    };
        this.timeSheetAttendanceRelated = {
          attendanceCycle: modelData.attendanceCycle,
          attendenceCollectionProcess:modelData.attendenceCollectionProcess
        };

        this.activityOwner = {
          timeSheeetAndPayroll:modelData.timeSheeetAndPayroll,
          salaryPayout : modelData.salaryPayout,
          invoiceSubmissionAndPaymentFollowup: modelData.invoiceSubmissionAndPaymentFollowup,
          po : modelData.po,
          disputesAndResolution: modelData.disputesAndResolution
        };

        this.payrollAndInvoice = {
          payrollCycle:modelData.payrollCycle,
          leaves : modelData.leaves,
          billingAndInvoiceProcess : modelData.billingAndInvoiceProcess
        };

        this.poAndInvoiceRelated ={
          poProcess:modelData.poProcess,
          discounts : modelData.discounts,
      billingOfficeAddress : modelData.billingOfficeAddress,
          shippingOfficeAdress : modelData.shippingOfficeAdress
        };

      this.clientEscalationMatrix = [];
      if (modelData && modelData.clientEscalationMatrix) {
        this.clientEscalationMatrix = modelData.clientEscalationMatrix.map(function (contact) {
          return new PointOfContactModel(contact);
        })
      }

      this.bgv=modelData.bgv;
      this.insurance=modelData.insurance;
      this.familiyAndIndividual=modelData.familiyAndIndividual;
      this.gpa=modelData.gpa;
      this.pricingValue=modelData.pricingValue;
      this.creditDays=modelData.creditDays;
      this.payCycle=modelData.payCycle;
      this.billCycle=modelData.billCycle;
    }

    return SLATracker;
});
