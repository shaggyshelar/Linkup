// List of hardcoded features along with their details.
var leaveTypes = [
  {
    "ID": 1,
    "Name": "Leave",
    "Code": "L",
    "Type": "Leave",
    "Applicable": "Yes",
    "Value": "1",
    "AdjustmentEntryApplicable": "No"
  },
  {
    "ID": 2,
    "Name": "Half Day Leave",
    "Code": "HL",
    "Type": "Half Day Leave",
    "Applicable": "Yes",
    "Value": "0.5",
    "AdjustmentEntryApplicable": "No"
  },
  {
    "ID": 3,
    "Name": "Absent (LWP)",
    "Code": "A",
    "Type": "Absent (LWP)",
    "Applicable": "Yes",
    "Value": "1",
    "AdjustmentEntryApplicable": "No"
  },
  {
    "ID": 4,
    "Name": "Half Day Absent (LWP)",
    "Code": "HA",
    "Type": "Half Day Absent (LWP)",
    "Applicable": "Yes",
    "Value": "0.5",
    "AdjustmentEntryApplicable": "No"
  },
  {
    "ID": 5,
    "Name": "Floating Holiday",
    "Code": "FH",
    "Type": "Floating Holiday",
    "Applicable": "No",
    "Value": "1",
    "AdjustmentEntryApplicable": "No"
  },
  {
    "ID": 6,
    "Name": "Holiday Fixed",
    "Code": "H",
    "Type": "Holiday Fixed",
    "Applicable": "No",
    "Value": "1",
    "AdjustmentEntryApplicable": "No"
  },
  {
    "ID": 10,
    "Name": null,
    "Code": "PL",
    "Type": "Paternity Leave",
    "Applicable": "No",
    "Value": "3",
    "AdjustmentEntryApplicable": "Yes"
  },
  {
    "ID": 11,
    "Name": null,
    "Code": "MAL",
    "Type": "Maternity Leave",
    "Applicable": "No",
    "Value": "60",
    "AdjustmentEntryApplicable": "Yes"
  },
  {
    "ID": 12,
    "Name": null,
    "Code": "ML",
    "Type": "Marriage Leave",
    "Applicable": "No",
    "Value": "3",
    "AdjustmentEntryApplicable": "Yes"
  }
]

module.exports = leaveTypes;
