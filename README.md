# ui-modal-form

### Instructions

Create a modal with 3 steps to collect information from a user. The modal will have 3 steps, Ownership, Documents, and Review.

These modals need to be navigable by using Next or Previous buttons
From a default page be able to click a button and start the modal forms.

1.  Ownership
    Complete the design as shown with the followng changes
    a. Add number formatting ###-###-####
    b. Add country code selector to phone number
    c. Social security Number: ###-##-###
    d. Date of Birth needs calendar select feature
    e. Add New Owner should generate up to 3 additional owner, total of 4 owners max
    f. Add appropriate validators to fields
    g. When “is an individual with significant responsibility” is checked the following effect happen:
    i. OWNER 1 change to > “CONTROL PRONG (must reside in US)”
    ii. Ownership is removed
    iii. Country is default to US
    iv. Remove Add Owner button
2.  Documents
    Build the design as shown with follow conditions
    a. Files must be uploaded individually to push to backend.
    b. User will be able to add multiple files to a single document type
    c. Be able to add additional document types, but not add duplicate type
    i. See chart below for types enum

          | Enum Value | Description |
          |------------|-------------|
          | BankLetter | Bank Letter |
          | PhotoIdentification | Photo Identification |
          | TaxReturn | Tax Return |
          | BankStatement | Bank Statement |
          | VoidedCheck | Voided Check |
          | BusinessLicense | Business License |
          | UtilityBill | Utility Bill |
          | PreviousProcessorStatements | Previous Processor Statements |
          | ApplicationUnredacted | Application Unredacted |
          | OtherUnderwritingDocuments | Other Underwriting Documents |
          | EquipmentOrderingForm | Equipment Ordering Form |
          | UnderwritingDocuments | Underwriting Documents |
          | AgentContract | Agent Contract |
          | SignedScheduleA | Signed Schedule A |
          | ResidualSplitprofileEmail | Residual Split Profile Email |
          | Other | Other |
          | NailSoft | Nail Soft Set up |

3.  Review:
    Display all the data fields that have been input from previous.
    a. This page is not given, you will need to make choice on how modal is
    displayed
