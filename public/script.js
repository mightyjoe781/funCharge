// color variables
var start_color = '#CE3000';
var end_color = '#47B700';
// battery slider variables
var batteryLvl = 50;
var slider = document.getElementById('batteryValInp');
var batteryDisplay = document.getElementById('batteryVal');
// car type select variable
var carType = 'hatchback';

// CREDENTIALS
var platform = new H.service.Platform({
  'apikey': 'IEt8dt3NQy3h3phRpCJ_XxK_rcmpHjSlsSZ0GlfBT8U'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,
  {
    zoom: 10,
    center: { lat: 28.6139, lng: 77.2090 }
  }
);

// Adding tilt to the map:
map.getViewModel().setLookAtData({
  tilt: 45
});

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
ui.getControl('mapsettings').setDisabled(false)
ui.getControl('zoom').setDisabled(false)
ui.getControl('scalebar').setDisabled(false)

// Positions of the UI components:
var mapSettings = ui.getControl('mapsettings');
var scalebar = ui.getControl('scalebar');
mapSettings.setAlignment('top-left');
scalebar.setAlignment('bottom-right');

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);
var behavior = new H.mapevents.Behavior(mapEvents);

// Emergency Contacts:
function getNumber(i) {
  var numbers = [
    {
      "Country": "Afghanistan",
      "Emergency": "",
      "Police": 119,
      "Ambulance": 102,
      "Fire": 119,
      "Call Codes": 93
    },
    {
      "Country": "Albania",
      "Emergency": "",
      "Police": 129,
      "Ambulance": 127,
      "Fire": 128,
      "Call Codes": 355
    },
    {
      "Country": "Algeria",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 14,
      "Fire": 14,
      "Call Codes": 213
    },
    {
      "Country": "American Samoa",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1684
    },
    {
      "Country": "Andorra",
      "Emergency": 112,
      "Police": 110,
      "Ambulance": 118,
      "Fire": 118,
      "Call Codes": 376
    },
    {
      "Country": "Angola",
      "Emergency": "",
      "Police": 113,
      "Ambulance": 112,
      "Fire": 115,
      "Call Codes": 244
    },
    {
      "Country": "Anguilla",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1264
    },
    {
      "Country": "Antigua & Barbuda",
      "Emergency": "911 or 999",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1268
    },
    {
      "Country": "Argentina",
      "Emergency": 911,
      "Police": 101,
      "Ambulance": 107,
      "Fire": 100,
      "Call Codes": 54
    },
    {
      "Country": "Armenia",
      "Emergency": "911 or 112",
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 374
    },
    {
      "Country": "Aruba",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 297
    },
    {
      "Country": "Ascension Island",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 247
    },
    {
      "Country": "Australia",
      "Emergency": "000, 112 mobiles\n0 landlines",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 61
    },
    {
      "Country": "Austria",
      "Emergency": 112,
      "Police": 113,
      "Ambulance": 144,
      "Fire": 122,
      "Call Codes": 43
    },
    {
      "Country": "Azerbaijan",
      "Emergency": "",
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 94
    },
    {
      "Country": "Bahamas",
      "Emergency": "911 or 919\n112 mobiles",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1242
    },
    {
      "Country": "Bahrain",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 973
    },
    {
      "Country": "Bangladesh",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 199,
      "Fire": "9 555 555",
      "Call Codes": 880
    },
    {
      "Country": "Barbados",
      "Emergency": "",
      "Police": 211,
      "Ambulance": 511,
      "Fire": 311,
      "Call Codes": 1246
    },
    {
      "Country": "Belarus",
      "Emergency": "",
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 375
    },
    {
      "Country": "Belgium",
      "Emergency": 112,
      "Police": 101,
      "Ambulance": 100,
      "Fire": 100,
      "Call Codes": 32
    },
    {
      "Country": "Belize",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 501
    },
    {
      "Country": "Benin",
      "Emergency": "",
      "Police": 117,
      "Ambulance": 112,
      "Fire": 118,
      "Call Codes": 229
    },
    {
      "Country": "Bermuda",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1441
    },
    {
      "Country": "Bhutan",
      "Emergency": "",
      "Police": 113,
      "Ambulance": 112,
      "Fire": 110,
      "Call Codes": 975
    },
    {
      "Country": "Bolivia",
      "Emergency": "",
      "Police": 110,
      "Ambulance": 118,
      "Fire": 119,
      "Call Codes": 591
    },
    {
      "Country": "Bosnia & Herzegovina",
      "Emergency": "",
      "Police": 122,
      "Ambulance": 124,
      "Fire": 123,
      "Call Codes": 387
    },
    {
      "Country": "Botswana",
      "Emergency": "997 or 911",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 267
    },
    {
      "Country": "Brazil",
      "Emergency": "",
      "Police": 190,
      "Ambulance": 192,
      "Fire": 193,
      "Call Codes": 55
    },
    {
      "Country": "British Indian Ocean Territory",
      "Emergency": "",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 246
    },
    {
      "Country": "British Virgin Islands",
      "Emergency": "999 or 911",
      "Police": "",
      "Ambulance": 999,
      "Fire": 999,
      "Call Codes": 1284
    },
    {
      "Country": "Brunei",
      "Emergency": "",
      "Police": 993,
      "Ambulance": 991,
      "Fire": 995,
      "Call Codes": 673
    },
    {
      "Country": "Bulgaria",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 359
    },
    {
      "Country": "Burkina Faso",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 112,
      "Fire": 18,
      "Call Codes": 226
    },
    {
      "Country": "Burundi",
      "Emergency": "",
      "Police": 117,
      "Ambulance": 112,
      "Fire": 118,
      "Call Codes": 257
    },
    {
      "Country": "Cambodia",
      "Emergency": "",
      "Police": 117,
      "Ambulance": 119,
      "Fire": 118,
      "Call Codes": 855
    },
    {
      "Country": "Cameroon",
      "Emergency": "",
      "Police": 17,
      "Ambulance": "",
      "Fire": 18,
      "Call Codes": 237
    },
    {
      "Country": "Canada",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1
    },
    {
      "Country": "Cape Verde / Cabo Verde",
      "Emergency": "",
      "Police": 132,
      "Ambulance": 130,
      "Fire": 131,
      "Call Codes": 238
    },
    {
      "Country": "Cayman Islands",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1345
    },
    {
      "Country": "Central African Republic",
      "Emergency": "",
      "Police": 117,
      "Ambulance": 1220,
      "Fire": 118,
      "Call Codes": 236
    },
    {
      "Country": "Chad",
      "Emergency": "",
      "Police": 17,
      "Ambulance": "2251-4242",
      "Fire": 18,
      "Call Codes": 235
    },
    {
      "Country": "Chile",
      "Emergency": "",
      "Police": 133,
      "Ambulance": 131,
      "Fire": 132,
      "Call Codes": 56
    },
    {
      "Country": "China",
      "Emergency": "",
      "Police": 110,
      "Ambulance": 120,
      "Fire": 119,
      "Call Codes": 86
    },
    {
      "Country": "Christmas Island",
      "Emergency": 0,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 61891
    },
    {
      "Country": "Cocos (Keeling) Islands",
      "Emergency": 0,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 61891
    },
    {
      "Country": "Colombia",
      "Emergency": "112 or 123",
      "Police": 156,
      "Ambulance": 132,
      "Fire": 119,
      "Call Codes": 57
    },
    {
      "Country": "Comoros",
      "Emergency": "",
      "Police": 17,
      "Ambulance": "772-03-73",
      "Fire": 18,
      "Call Codes": 269
    },
    {
      "Country": "DR Congo / Democratic Republic of the Congo",
      "Emergency": "",
      "Police": "",
      "Ambulance": "",
      "Fire": 118,
      "Call Codes": 243
    },
    {
      "Country": "Congo / Congo Republic",
      "Emergency": "",
      "Police": 112,
      "Ambulance": "",
      "Fire": 118,
      "Call Codes": 242
    },
    {
      "Country": "Cook Islands",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 998,
      "Fire": 996,
      "Call Codes": 682
    },
    {
      "Country": "Costa Rica",
      "Emergency": "112 or 911",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 506
    },
    {
      "Country": "Côte d’Ivoire / Ivory Coast",
      "Emergency": "",
      "Police": 111,
      "Ambulance": 185,
      "Fire": 180,
      "Call Codes": 225
    },
    {
      "Country": "Croatia",
      "Emergency": 112,
      "Police": 192,
      "Ambulance": 194,
      "Fire": 193,
      "Call Codes": 385
    },
    {
      "Country": "Cuba",
      "Emergency": "",
      "Police": 106,
      "Ambulance": 104,
      "Fire": 105,
      "Call Codes": 53
    },
    {
      "Country": "Curaçao / Curacao",
      "Emergency": "",
      "Police": 911,
      "Ambulance": 912,
      "Fire": 911,
      "Call Codes": 599
    },
    {
      "Country": "Cyprus",
      "Emergency": "112 or 199",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 357
    },
    {
      "Country": "Northern Cyprus",
      "Emergency": 112,
      "Police": 155,
      "Ambulance": "",
      "Fire": 199,
      "Call Codes": 357
    },
    {
      "Country": "Czechia / Czech Republic",
      "Emergency": 112,
      "Police": 158,
      "Ambulance": 155,
      "Fire": 150,
      "Call Codes": 420
    },
    {
      "Country": "Denmark",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 45
    },
    {
      "Country": "Djibouti",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 351351,
      "Fire": 18,
      "Call Codes": 253
    },
    {
      "Country": "Dominica",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1767
    },
    {
      "Country": "Dominican Republic",
      "Emergency": "112 or 911",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": "1809/829/849"
    },
    {
      "Country": "East Timor / Timor-Leste",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 670
    },
    {
      "Country": "Ecuador",
      "Emergency": 911,
      "Police": 101,
      "Ambulance": 911,
      "Fire": 102,
      "Call Codes": 593
    },
    {
      "Country": "Egypt",
      "Emergency": "",
      "Police": 122,
      "Ambulance": 123,
      "Fire": 180,
      "Call Codes": 20
    },
    {
      "Country": "El Salvador",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 503
    },
    {
      "Country": "Equatorial Guinea",
      "Emergency": "",
      "Police": 114,
      "Ambulance": 112,
      "Fire": 155,
      "Call Codes": 240
    },
    {
      "Country": "Eritrea",
      "Emergency": "",
      "Police": 113,
      "Ambulance": 114,
      "Fire": 116,
      "Call Codes": 291
    },
    {
      "Country": "Estonia",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 372
    },
    {
      "Country": "Eswatini (Swaziland)",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 977,
      "Fire": 933,
      "Call Codes": 268
    },
    {
      "Country": "Ethiopia",
      "Emergency": 911,
      "Police": 991,
      "Ambulance": 907,
      "Fire": 939,
      "Call Codes": 251
    },
    {
      "Country": "Falkland Islands",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 500
    },
    {
      "Country": "Faroe Islands",
      "Emergency": 112,
      "Police": "298 351448",
      "Ambulance": 1870,
      "Fire": "298 314544",
      "Call Codes": 298
    },
    {
      "Country": "Fiji",
      "Emergency": "",
      "Police": 911,
      "Ambulance": 911,
      "Fire": 9170,
      "Call Codes": 679
    },
    {
      "Country": "Finland",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 358
    },
    {
      "Country": "France",
      "Emergency": 112,
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 33
    },
    {
      "Country": "French Guiana",
      "Emergency": 112,
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 594
    },
    {
      "Country": "French Polynesia",
      "Emergency": 112,
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 689
    },
    {
      "Country": "Gabon",
      "Emergency": "",
      "Police": 1730,
      "Ambulance": 1300,
      "Fire": 18,
      "Call Codes": 241
    },
    {
      "Country": "Gambia",
      "Emergency": "",
      "Police": "117 or 112",
      "Ambulance": 116,
      "Fire": 118,
      "Call Codes": 220
    },
    {
      "Country": "Georgia",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 995
    },
    {
      "Country": "Germany",
      "Emergency": 112,
      "Police": 110,
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 49
    },
    {
      "Country": "Ghana",
      "Emergency": 999,
      "Police": 191,
      "Ambulance": 193,
      "Fire": 192,
      "Call Codes": 233
    },
    {
      "Country": "Gibraltar",
      "Emergency": "112 or 199",
      "Police": "",
      "Ambulance": 190,
      "Fire": 190,
      "Call Codes": 350
    },
    {
      "Country": "Greece",
      "Emergency": 112,
      "Police": 100,
      "Ambulance": 166,
      "Fire": 199,
      "Call Codes": 30
    },
    {
      "Country": "Greenland",
      "Emergency": "112 mobiles only",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 299
    },
    {
      "Country": "Grenada",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1473
    },
    {
      "Country": "Guadeloupe",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 590
    },
    {
      "Country": "Guam",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1671
    },
    {
      "Country": "Guatemala",
      "Emergency": "",
      "Police": "110, 120",
      "Ambulance": "122, 123 or 1554",
      "Fire": "122, 123 or 1554",
      "Call Codes": 502
    },
    {
      "Country": "Guinea",
      "Emergency": "",
      "Police": 122,
      "Ambulance": "442-020",
      "Fire": 1717,
      "Call Codes": 224
    },
    {
      "Country": "Guinea-Bissau",
      "Emergency": 112,
      "Police": 117,
      "Ambulance": 119,
      "Fire": 118,
      "Call Codes": 245
    },
    {
      "Country": "Guyana",
      "Emergency": 112,
      "Police": "",
      "Ambulance": 913,
      "Fire": 912,
      "Call Codes": 592
    },
    {
      "Country": "Haiti",
      "Emergency": 118,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 509
    },
    {
      "Country": "Honduras",
      "Emergency": 199,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 504
    },
    {
      "Country": "Hong Kong",
      "Emergency": "999 on landlines\n112 on mobiles",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 852
    },
    {
      "Country": "Hungary",
      "Emergency": 112,
      "Police": 107,
      "Ambulance": 104,
      "Fire": 105,
      "Call Codes": 36
    },
    {
      "Country": "Iceland",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 354
    },
    {
      "Country": "India",
      "Emergency": 108,
      "Police": 100,
      "Ambulance": 102,
      "Fire": 101,
      "Call Codes": 91
    },
    {
      "Country": "Indonesia",
      "Emergency": "",
      "Police": 110,
      "Ambulance": "118 or 119",
      "Fire": 113,
      "Call Codes": 62
    },
    {
      "Country": "Iran",
      "Emergency": "112 on mobiles",
      "Police": 110,
      "Ambulance": 115,
      "Fire": 125,
      "Call Codes": 98
    },
    {
      "Country": "Iraq",
      "Emergency": 122,
      "Police": 104,
      "Ambulance": "",
      "Fire": 115,
      "Call Codes": 964
    },
    {
      "Country": "Ireland",
      "Emergency": "112 or 199",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 353
    },
    {
      "Country": "Israel",
      "Emergency": "",
      "Police": 100,
      "Ambulance": 101,
      "Fire": 102,
      "Call Codes": 972
    },
    {
      "Country": "Italy",
      "Emergency": 112,
      "Police": 113,
      "Ambulance": 118,
      "Fire": 115,
      "Call Codes": 39
    },
    {
      "Country": "Jamaica",
      "Emergency": "",
      "Police": 119,
      "Ambulance": 110,
      "Fire": 110,
      "Call Codes": 1876
    },
    {
      "Country": "Japan",
      "Emergency": "",
      "Police": 110,
      "Ambulance": 119,
      "Fire": 119,
      "Call Codes": 81
    },
    {
      "Country": "Jordan",
      "Emergency": "112 or 911",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 962
    },
    {
      "Country": "Kazakhstan",
      "Emergency": 112,
      "Police": "102, 02",
      "Ambulance": "103, 03",
      "Fire": "101, 01",
      "Call Codes": "7-6xx"
    },
    {
      "Country": "Kenya",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 254
    },
    {
      "Country": "Kiribati",
      "Emergency": "",
      "Police": 992,
      "Ambulance": 994,
      "Fire": 993,
      "Call Codes": 686
    },
    {
      "Country": "North Korea",
      "Emergency": "112 or 119",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 850
    },
    {
      "Country": "South Korea",
      "Emergency": "",
      "Police": 112,
      "Ambulance": 119,
      "Fire": 119,
      "Call Codes": 82
    },
    {
      "Country": "Kosovo",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 383
    },
    {
      "Country": "Kuwait",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 965
    },
    {
      "Country": "Kyrgyzstan",
      "Emergency": "",
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 996
    },
    {
      "Country": "Laos / Lao",
      "Emergency": "",
      "Police": 191,
      "Ambulance": 195,
      "Fire": 190,
      "Call Codes": 856
    },
    {
      "Country": "Latvia",
      "Emergency": 112,
      "Police": 2,
      "Ambulance": 3,
      "Fire": 1,
      "Call Codes": 371
    },
    {
      "Country": "Lebanon",
      "Emergency": "",
      "Police": "112 or 999",
      "Ambulance": 140,
      "Fire": 175,
      "Call Codes": 961
    },
    {
      "Country": "Lesotho",
      "Emergency": "",
      "Police": 123,
      "Ambulance": 121,
      "Fire": 122,
      "Call Codes": 266
    },
    {
      "Country": "Liberia",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 231
    },
    {
      "Country": "Libya",
      "Emergency": 1515,
      "Police": "",
      "Ambulance": "",
      "Fire": 193,
      "Call Codes": 218
    },
    {
      "Country": "Liechtenstein",
      "Emergency": 112,
      "Police": 117,
      "Ambulance": 144,
      "Fire": 118,
      "Call Codes": 423
    },
    {
      "Country": "Lithuania",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 370
    },
    {
      "Country": "Luxembourg",
      "Emergency": 112,
      "Police": 113,
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 352
    },
    {
      "Country": "Macao",
      "Emergency": "999\n110 or 112 on mobiles",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 853
    },
    {
      "Country": "Madagascar",
      "Emergency": "",
      "Police": 117,
      "Ambulance": 124,
      "Fire": 118,
      "Call Codes": 261
    },
    {
      "Country": "Malawi",
      "Emergency": "",
      "Police": "997 or 990",
      "Ambulance": 998,
      "Fire": 999,
      "Call Codes": 265
    },
    {
      "Country": "Malaysia",
      "Emergency": "112 or 999",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 60
    },
    {
      "Country": "Maldives",
      "Emergency": 102,
      "Police": 119,
      "Ambulance": 102,
      "Fire": 118,
      "Call Codes": 960
    },
    {
      "Country": "Mali",
      "Emergency": "",
      "Police": 18,
      "Ambulance": 15,
      "Fire": 17,
      "Call Codes": 223
    },
    {
      "Country": "Malta",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 356
    },
    {
      "Country": "Marshall Islands",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 692
    },
    {
      "Country": "Martinique",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 596
    },
    {
      "Country": "Mauritania",
      "Emergency": "",
      "Police": 117,
      "Ambulance": 101,
      "Fire": 118,
      "Call Codes": 222
    },
    {
      "Country": "Mauritius",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 230
    },
    {
      "Country": "Mayotte",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 262
    },
    {
      "Country": "Mexico",
      "Emergency": "911 or 066",
      "Police": 66,
      "Ambulance": 65,
      "Fire": 68,
      "Call Codes": 52
    },
    {
      "Country": "Micronesia, Federated States of",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 691
    },
    {
      "Country": "Moldova",
      "Emergency": 112,
      "Police": 122,
      "Ambulance": 124,
      "Fire": 123,
      "Call Codes": 373
    },
    {
      "Country": "Monaco",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 377
    },
    {
      "Country": "Mongolia",
      "Emergency": 100,
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 976
    },
    {
      "Country": "Montenegro",
      "Emergency": 112,
      "Police": 102,
      "Ambulance": 124,
      "Fire": 123,
      "Call Codes": 382
    },
    {
      "Country": "Montserrat",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 911,
      "Fire": 911,
      "Call Codes": 1664
    },
    {
      "Country": "Morocco",
      "Emergency": "",
      "Police": 19,
      "Ambulance": 15,
      "Fire": 15,
      "Call Codes": 212
    },
    {
      "Country": "Mozambique",
      "Emergency": "",
      "Police": 119,
      "Ambulance": 117,
      "Fire": 198,
      "Call Codes": 258
    },
    {
      "Country": "Myanmar (Burma)",
      "Emergency": 191,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 95
    },
    {
      "Country": "Namibia",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 264
    },
    {
      "Country": "Nauru",
      "Emergency": "",
      "Police": 110,
      "Ambulance": 111,
      "Fire": 112,
      "Call Codes": 674
    },
    {
      "Country": "Nepal",
      "Emergency": "112 on mobiles",
      "Police": "100 or 103",
      "Ambulance": 102,
      "Fire": 101,
      "Call Codes": 977
    },
    {
      "Country": "Netherlands",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 31
    },
    {
      "Country": "New Caledonia",
      "Emergency": 112,
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 687
    },
    {
      "Country": "New Zealand",
      "Emergency": 111,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 64
    },
    {
      "Country": "Nicaragua",
      "Emergency": 118,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 505
    },
    {
      "Country": "Niger",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 227
    },
    {
      "Country": "Nigeria",
      "Emergency": 119,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 234
    },
    {
      "Country": "Niue",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 683
    },
    {
      "Country": "Norfolk Island",
      "Emergency": 999,
      "Police": 977,
      "Ambulance": 911,
      "Fire": 955,
      "Call Codes": 672
    },
    {
      "Country": "North Macedonia",
      "Emergency": 112,
      "Police": 194,
      "Ambulance": 192,
      "Fire": 193,
      "Call Codes": 389
    },
    {
      "Country": "Northern Mariana Islands",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1670
    },
    {
      "Country": "Norway",
      "Emergency": "",
      "Police": 112,
      "Ambulance": 113,
      "Fire": 110,
      "Call Codes": 47
    },
    {
      "Country": "Oman",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 968
    },
    {
      "Country": "Pakistan",
      "Emergency": "15, 1122 landlines\n112 mobiles",
      "Police": 15,
      "Ambulance": 115,
      "Fire": 16,
      "Call Codes": 92
    },
    {
      "Country": "Palau",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 680
    },
    {
      "Country": "Palestinian Territories",
      "Emergency": "",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 92
    },
    {
      "Country": "Panama",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 507
    },
    {
      "Country": "Papua New Guinea",
      "Emergency": 111,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 675
    },
    {
      "Country": "Paraguay",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 595
    },
    {
      "Country": "Peru",
      "Emergency": "",
      "Police": 105,
      "Ambulance": 117,
      "Fire": 116,
      "Call Codes": 51
    },
    {
      "Country": "Philippines",
      "Emergency": "117, 112 and 911",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 63
    },
    {
      "Country": "Pitcairn Islands",
      "Emergency": "",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 64
    },
    {
      "Country": "Poland",
      "Emergency": 112,
      "Police": 997,
      "Ambulance": 999,
      "Fire": 998,
      "Call Codes": 48
    },
    {
      "Country": "Portugal",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 351
    },
    {
      "Country": "Puerto Rico",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1787
    },
    {
      "Country": "Qatar",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 974
    },
    {
      "Country": "Réunion",
      "Emergency": 112,
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 262
    },
    {
      "Country": "Romania",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 40
    },
    {
      "Country": "Russia",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 7
    },
    {
      "Country": "Rwanda",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 250
    },
    {
      "Country": "Saint Helena",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 911,
      "Fire": 999,
      "Call Codes": 290
    },
    {
      "Country": "Saint Kitts & Nevis",
      "Emergency": "",
      "Police": 911,
      "Ambulance": 911,
      "Fire": 333,
      "Call Codes": 1869
    },
    {
      "Country": "Saint Lucia",
      "Emergency": "911 or 999",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1758
    },
    {
      "Country": "Saint Martin",
      "Emergency": "",
      "Police": 911,
      "Ambulance": 912,
      "Fire": 910,
      "Call Codes": 33
    },
    {
      "Country": "Saint Pierre & Miquelon",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 508
    },
    {
      "Country": "Saint Vincent & Grenadines",
      "Emergency": "999 or 911",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1784
    },
    {
      "Country": "Samoa",
      "Emergency": 999,
      "Police": 995,
      "Ambulance": 996,
      "Fire": 994,
      "Call Codes": 685
    },
    {
      "Country": "San Marino",
      "Emergency": "",
      "Police": 113,
      "Ambulance": 118,
      "Fire": 115,
      "Call Codes": 378
    },
    {
      "Country": "São Tomé & Príncipe",
      "Emergency": "",
      "Police": 222222,
      "Ambulance": "221221, 221222 & 221234",
      "Fire": 112,
      "Call Codes": 239
    },
    {
      "Country": "Saudi Arabia",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 997,
      "Fire": 998,
      "Call Codes": 966
    },
    {
      "Country": "Senegal",
      "Emergency": "",
      "Police": 17,
      "Ambulance": 15,
      "Fire": 18,
      "Call Codes": 221
    },
    {
      "Country": "Serbia",
      "Emergency": 112,
      "Police": 192,
      "Ambulance": 194,
      "Fire": 193,
      "Call Codes": 381
    },
    {
      "Country": "Seychelles",
      "Emergency": "112 or 999",
      "Police": 133,
      "Ambulance": 151,
      "Fire": "",
      "Call Codes": 248
    },
    {
      "Country": "Sierra Leone",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 999,
      "Fire": 19,
      "Call Codes": 232
    },
    {
      "Country": "Singapore",
      "Emergency": "112 on foreign mobiles",
      "Police": 999,
      "Ambulance": 995,
      "Fire": 995,
      "Call Codes": 65
    },
    {
      "Country": "Slovakia",
      "Emergency": 112,
      "Police": 158,
      "Ambulance": 155,
      "Fire": 150,
      "Call Codes": 421
    },
    {
      "Country": "Slovenia",
      "Emergency": 112,
      "Police": 113,
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 386
    },
    {
      "Country": "Solomon Islands",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 677
    },
    {
      "Country": "Somalia",
      "Emergency": "",
      "Police": 888,
      "Ambulance": 999,
      "Fire": 555,
      "Call Codes": 252
    },
    {
      "Country": "South Africa",
      "Emergency": "112 on mobiles",
      "Police": 10111,
      "Ambulance": 10177,
      "Fire": 10111,
      "Call Codes": 27
    },
    {
      "Country": "South Georgia & South Sandwich Islands",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 500
    },
    {
      "Country": "South Sudan",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 211
    },
    {
      "Country": "Spain",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 34
    },
    {
      "Country": "Sri Lanka",
      "Emergency": "",
      "Police": "119, 118",
      "Ambulance": 110,
      "Fire": 111,
      "Call Codes": 94
    },
    {
      "Country": "Sudan",
      "Emergency": 999,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 249
    },
    {
      "Country": "Suriname",
      "Emergency": 115,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 597
    },
    {
      "Country": "Sweden",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 46
    },
    {
      "Country": "Switzerland",
      "Emergency": 112,
      "Police": 117,
      "Ambulance": 144,
      "Fire": 118,
      "Call Codes": 41
    },
    {
      "Country": "Syria",
      "Emergency": "",
      "Police": 112,
      "Ambulance": 110,
      "Fire": 113,
      "Call Codes": 963
    },
    {
      "Country": "Taiwan, Republic of China",
      "Emergency": "112 on mobiles",
      "Police": 110,
      "Ambulance": 119,
      "Fire": 119,
      "Call Codes": 886
    },
    {
      "Country": "Tajikistan",
      "Emergency": "112 on mobiles",
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 992
    },
    {
      "Country": "Tanzania",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 255
    },
    {
      "Country": "Thailand",
      "Emergency": "",
      "Police": 191,
      "Ambulance": 1669,
      "Fire": 199,
      "Call Codes": 66
    },
    {
      "Country": "Togo",
      "Emergency": "",
      "Police": "117 or 161",
      "Ambulance": 8200,
      "Fire": 118,
      "Call Codes": 228
    },
    {
      "Country": "Tokelau",
      "Emergency": "",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 690
    },
    {
      "Country": "Tonga",
      "Emergency": 911,
      "Police": 922,
      "Ambulance": 933,
      "Fire": 999,
      "Call Codes": 676
    },
    {
      "Country": "Trinidad & Tobago",
      "Emergency": "",
      "Police": 999,
      "Ambulance": 990,
      "Fire": 990,
      "Call Codes": 1868
    },
    {
      "Country": "Tunisia",
      "Emergency": "",
      "Police": 197,
      "Ambulance": 190,
      "Fire": 198,
      "Call Codes": 216
    },
    {
      "Country": "Turkey",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 90
    },
    {
      "Country": "Turkmenistan",
      "Emergency": 112,
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 993
    },
    {
      "Country": "Turks & Caicos Islands",
      "Emergency": "911 or 999",
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1649
    },
    {
      "Country": "Tuvalu",
      "Emergency": "",
      "Police": 911,
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 688
    },
    {
      "Country": "Uganda",
      "Emergency": "199, 112 mobiles",
      "Police": "199, 112 mobiles",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 256
    },
    {
      "Country": "Ukraine",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 380
    },
    {
      "Country": "United Arab Emirates",
      "Emergency": "",
      "Police": "999, 112",
      "Ambulance": "999, 998",
      "Fire": 997,
      "Call Codes": 971
    },
    {
      "Country": "United Kingdom (UK; England, Scotland, Wales, Northern Island)",
      "Emergency": "112 0r 999",
      "Police": "999 or 112",
      "Ambulance": 999,
      "Fire": 999,
      "Call Codes": 44
    },
    {
      "Country": "United States of America",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1
    },
    {
      "Country": "Uruguay",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 598
    },
    {
      "Country": "Uzbekistan",
      "Emergency": "",
      "Police": 102,
      "Ambulance": 103,
      "Fire": 101,
      "Call Codes": 998
    },
    {
      "Country": "Vanuatu",
      "Emergency": 112,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 678
    },
    {
      "Country": "Vatican City / Holy See",
      "Emergency": "",
      "Police": 113,
      "Ambulance": 118,
      "Fire": 115,
      "Call Codes": "39/379"
    },
    {
      "Country": "Venezuela",
      "Emergency": 171,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 58
    },
    {
      "Country": "Vietnam",
      "Emergency": "",
      "Police": 113,
      "Ambulance": 115,
      "Fire": 114,
      "Call Codes": 84
    },
    {
      "Country": "United States Virgin Islands",
      "Emergency": 911,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 1340
    },
    {
      "Country": "Wallis & Futuna",
      "Emergency": "",
      "Police": 18,
      "Ambulance": 15,
      "Fire": 17,
      "Call Codes": 681
    },
    {
      "Country": "Western Sahara",
      "Emergency": 150,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 212
    },
    {
      "Country": "Yemen",
      "Emergency": 199,
      "Police": "",
      "Ambulance": "",
      "Fire": "",
      "Call Codes": 967
    },
    {
      "Country": "Zambia",
      "Emergency": 112,
      "Police": 999,
      "Ambulance": 993,
      "Fire": 991,
      "Call Codes": 260
    },
    {
      "Country": "Zimbabwe",
      "Emergency": 999,
      "Police": 995,
      "Ambulance": 994,
      "Fire": 993,
      "Call Codes": 264
    }
  ];
  var countryName = i[i.length - 1].slice(1);
  for (var j = 0; j < numbers.length; j++) {
    if (countryName == numbers[j].Country) {
      return `<div class="ui six tiny horizontal statistics">
                    <div class="statistic">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Country)}
                        </div>
                        <div class="label">
                        REGION
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j]["Call Codes"])}
                        </div>
                        <div class="label">
                        Call Codes
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Emergency)}
                        </div>
                        <div class="label">
                        Emergency
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Police)}
                        </div>
                        <div class="label">
                        Police
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Ambulance)}
                        </div>
                        <div class="label">
                        Ambulance
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Fire)}
                        </div>
                        <div class="label">
                        Fire
                        </div>
                    </div>
                    </div>`;
    }

  }
  return `<div class="ui info message" style="margin-top: 0.3vh;">
                <div class="header">
                    Not Available for this region, please click somewhere else
                </div>
            Click <a href="https://www.adducation.info/general-knowledge-travel-and-transport/emergency-numbers/"><b>here</b></a> for countrywise list of emergency numbers
            </div>`;
}

// Emergency Contacts Helper: 
function emptlyValueNumbers(k) {
  if (k == "") {
    return `<i class="ban icon"></i>`;
  } else {
    return k;
  }
}

// Reverse GeoCode:
var geocoder = platform.getSearchService();
function revGeocode(lat, lon) {
  var sol = lat + "," + lon;
  let geocodeParam = {
    at: sol
  }

  function onResult(result) {
    if (result.items.length > 0) {
      var x = result.items[0].title;
      document.getElementById("status").innerHTML = '<h3>' + x + '</h3>';
      var i = x.split(",");
      document.getElementById("contacts").innerHTML = getNumber(i);
    } else if (result.items.length == 0) {
      document.getElementById("status").innerHTML = "<h1>funCharge</h1>";
    }
  }

  geocoder.reverseGeocode(geocodeParam, onResult, alert);
}

// mark positions button
markPosition = () => {
  // TODO: start and end position mark logic
  document.getElementById('routeBtn').classList.remove("disabled")
}

// function to get gradient color
getGradientColor = function (start_color, end_color, percent) {
  // strip the leading # if it's there
  start_color = start_color.replace(/^\s*#|\s*$/g, '');
  end_color = end_color.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (start_color.length == 3) {
    start_color = start_color.replace(/(.)/g, '$1$1');
  }

  if (end_color.length == 3) {
    end_color = end_color.replace(/(.)/g, '$1$1');
  }

  // get colors
  var start_red = parseInt(start_color.substr(0, 2), 16),
    start_green = parseInt(start_color.substr(2, 2), 16),
    start_blue = parseInt(start_color.substr(4, 2), 16);

  var end_red = parseInt(end_color.substr(0, 2), 16),
    end_green = parseInt(end_color.substr(2, 2), 16),
    end_blue = parseInt(end_color.substr(4, 2), 16);

  // calculate new color
  var diff_red = end_red - start_red;
  var diff_green = end_green - start_green;
  var diff_blue = end_blue - start_blue;

  diff_red = ((diff_red * percent) + start_red).toString(16).split('.')[0];
  diff_green = ((diff_green * percent) + start_green).toString(16).split('.')[0];
  diff_blue = ((diff_blue * percent) + start_blue).toString(16).split('.')[0];

  // ensure 2 digits by color
  if (diff_red.length == 1) diff_red = '0' + diff_red
  if (diff_green.length == 1) diff_green = '0' + diff_green
  if (diff_blue.length == 1) diff_blue = '0' + diff_blue

  return '#' + diff_red + diff_green + diff_blue;
};

var accentColor;
// DOMcontentloaded function
document.addEventListener('DOMContentLoaded', function () {
  // battery slider
  accentColor = getGradientColor(start_color, end_color, batteryLvl / 100)
  batteryDisplay.style.color = accentColor
  batteryDisplay.innerHTML = batteryLvl
  // cartype
  document.getElementById(carType).style.backgroundColor = accentColor;
}, false);

// car type select
carSelect = (carSelected) => {
  // console.log("car clicked " + carSelected)
  if (carType != carSelected) {
    document.getElementById('hatchback').style.backgroundColor = '#FFFFFF';
    document.getElementById('sedan').style.backgroundColor = '#FFFFFF';
    document.getElementById('SUV').style.backgroundColor = '#FFFFFF';
  }
  carType = carSelected
  document.getElementById(carType).style.backgroundColor = accentColor;
};


// battery slider value update
slider.addEventListener('input', (event) => {
  // slider.style.color = getGradientColor('#FF0000', '#00FF00', slider.value / 100)
  batteryLvl = slider.value
  accentColor = getGradientColor(start_color, end_color, batteryLvl / 100)
  document.getElementById(carType).style.backgroundColor = accentColor;
  batteryDisplay.style.color = accentColor
  batteryDisplay.innerHTML = slider.value
});

function globalFncTap(evt) {
  var coord = map.screenToGeo(evt.currentPointer.viewportX,
    evt.currentPointer.viewportY);
  var lat = coord.lat.toFixed(4);
  var lon = coord.lng.toFixed(4);
  revGeocode(lat, lon);
};

// Listening to current map location:
function ClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener('tap', globalFncTap);
  
}

ClickListener(map);

var str = "not set";
var end = "not set";

function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.

  document.getElementById("status").innerHTML = "<h4>Select <b>START</b> and <b>END</b> points on the map</h4>";
  var cnt = 0;
  map.addEventListener('tap', fnc);
  map.removeEventListener('tap', globalFncTap);
  function fnc(evt) {
    var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    let Pos = { lat: coord.lat, lng: coord.lng };


    var ans = Pos.lat + ',' + Pos.lng;
    if (cnt == 0) {
      document.getElementById("status").innerHTML = "<h4><b>START</b> point selected</h4>";
      str = ans;
      let strIcon = new H.map.Icon('assets/start.png');
      let strMarker = new H.map.Marker(Pos, { icon: strIcon });
      map.addObject(strMarker);
      strMarker.setData("START for routing!");
      console.log("START: " + ans);
    }
    if (cnt == 1) {
      document.getElementById("status").innerHTML = "<h4><b>END</b> point selected</h4>";
      end = ans;
      let endIcon = new H.map.Icon('assets/end.png');
      let endMarker = new H.map.Marker(Pos, { icon: endIcon });
      map.addObject(endMarker);
      endMarker.setData("END for routing!");
      console.log("END: " + ans);
    }

    cnt++;
    if (cnt == 2) {

      map.removeEventListener('tap', fnc);
      // alert("Use ROUTE button to trace your path on the map");
      map.addEventListener('tap', globalFncTap);
      $('#routeBtn').removeClass("disabled");
      $('#markBtn').addClass("disabled");
    }
    //console.log('Clicked at ' + coord.lat.toFixed(4) +
    // ((coord.lat > 0) ? 'N' : 'S') +
    /// ' ' + coord.lng.toFixed(4) +
    /// ((coord.lng > 0) ? 'E' : 'W'));
  }

}

function clickToMark(){
  // Add event listener:
  map.addEventListener('longpress', function(evt) {
      if(evt.target instanceof H.map.Marker){
          //bubble
          // Create an info bubble object at a specific geographic location:
          var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          content: evt.target.getData()
   });
          // Add info bubble to the UI:
          ui.addBubble(bubble);
      }
      else{
          // Log 'tap' and 'mouse' events:
          var cnt =0;
          console.log(evt); // too much data here (try to minify)
          let pointer = evt.currentPointer;
          let imgIcon = new H.map.Icon('assets/robot.png');
          let pointerPoistion = map.screenToGeo(pointer.viewportX, pointer.viewportY);
          let pointerMarker = new H.map.Marker(pointerPoistion,{icon: imgIcon, volatility: true});
          pointerMarker.draggable = true;
          if(cnt == 0){
              var userData = prompt("Enter some data for this pointer:");
              pointerMarker.setData(userData);
              console.log("Pointer added!");
          }else{
              pointerMarker.getData();
          }
                 
          map.addObject(pointerMarker);
      }
  });
}

clickToMark();

function clickDragMarkers(){
  // disable the default draggability of the underlying map
  // and calculate the offset between mouse and target's position
  // when starting to drag a marker object:
  map.addEventListener('dragstart', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
      var targetPosition = map.geoToScreen(target.getGeometry());
      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
      behavior.disable();
      }
  }, false);
  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener('dragend', function(ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        
          
      behavior.enable();
      }
  }, false);
  // Listen to the drag event and move the position of the marker
  // as necessary
  map.addEventListener('drag', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
  }, false);
}

clickDragMarkers();