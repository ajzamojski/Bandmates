 $(document).ready(function() {

var stateSelect = $("#state");

// zip code validator
    function validateZIP(field) {
      var valid = "0123456789-";
      var hyphencount = 0;

      if (field.length!=5 && field.length!=10) {
      alert("Please enter your 5 digit or 5 digit+4 zip code.");
      return false;
      }
      for (var i=0; i < field.length; i++) {
      temp = "" + field.substring(i, i+1);
      if (temp == "-") hyphencount++;
      if (valid.indexOf(temp) == "-1") {
      alert("Invalid characters in your zip code.  Please try again.");
      return false;
      }
      if ((hyphencount > 1) || ((field.length==10) && ""+field.charAt(5)!="-")) {
      alert("The hyphen character should be used with a properly formatted 5 digit+four zip code, like '12345-6789'.   Please try again.");
      return false;
        }
      }
      return true;
}

//function to create dropdown row
function createRow(item) {
    var listOption = $("<option>");
    listOption.attr("value", item);
    listOption.text(item);
    return listOption;
  }

//function to create dropdown lists
  function createDropDown(arrayName, list){

    var rowsToAdd = [];

    for (var i = 0; i < arrayName.length; i++) {
      rowsToAdd.push(createRow(arrayName[i]));
    };

    list.empty();
    list.append(rowsToAdd);
    list.val(rowsToAdd);
  };


//Arrays of vaules for state and gender drop down lists
var states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
        "KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
        "NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];


createDropDown(states, stateSelect);

});