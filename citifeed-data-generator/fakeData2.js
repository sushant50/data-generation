var fs = require('fs');
const faker = require('faker')
const RandExp = require('randexp');
var assert = require('assert');

// Helper functions

function generate(n) {
  let num = "";
  for (i = 0; i < n; i++) {
    num += faker.random.number({
      'min': 0,
      'max': 9
    }).toString(); 
  }
  return num;
}

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}

function fill_up_to_nth_char(row_str_so_far, n) {
    // console.log(row_str_so_far);
    // console.log(row_str_so_far.length);
    // console.log(n);
    difference = n - row_str_so_far.length;
    // console.log(difference);
    let space_str = "";
    if (difference < 0) {
      row_str_so_far = row_str_so_far.substring(0, n); 
    }
    else {
      space_str = new Array(difference + 1).join( '\xa0' );
    }
    return row_str_so_far + space_str;
}

function create_regular_row_random() {
  // number (1) + fname (26) + space (1) + lname (26) + space (26) + address (26) + space (26) + city (18) + state (2) + zip (5) + ext (4) + space (7) +
  // number (10) + number (16) + number (4) + number (4) + date (10) + language (2) + number + space (5 + 1 = 6) + letter (1) + letter (1) + space (1) + 
  // space (1) + space (10) + space (10) + space (4) + number + space (10 + 1 = 11) + space (3) + space (1) + space (1) + number (2) + date (10) + 
  // date (10) + date (10) + letter (1) + letter (1) + date (10) + space (20) + space (10) + space (1) * 4 + space (15) + number (16) + date (10) + 
  // email (50) + number (13) + letter (1) + random string (60)
  let entry = null;
  let row_str = null;
  row_str = generate(1); // number (1) : 1/507
  assert(row_str.length == 1);
  entry = faker.name.firstName();
  row_str += fill_up_to_nth_char(entry, 26); // fname (26) : 27/507
  assert(row_str.length == 27);
  row_str += " "; // space (1) : 28/507
  assert(row_str.length == 28);
  entry = faker.name.lastName();
  row_str += fill_up_to_nth_char(entry, 26); // lname (26) : 54/507
  assert(row_str.length == 54);
  entry = fill_up_to_nth_char("", 26);
  row_str += entry; // space (26) : 80/507
  assert(row_str.length == 80);
  entry = faker.address.streetAddress();
  row_str += fill_up_to_nth_char(entry, 26); // address (26) : 106/507
  assert(row_str.length == 106);
  entry = fill_up_to_nth_char("", 26);
  row_str += entry; // space (26) : 132/507
  entry = faker.address.city();
  row_str += fill_up_to_nth_char(entry, 18); // city (18) : 150/507
  entry = faker.address.stateAbbr();
  row_str += fill_up_to_nth_char(entry, 2); // state (2) : 152/507
  entry = faker.address.zipCode("#####");
  row_str += fill_up_to_nth_char(entry, 5); // zip (5) : 157/507
  row_str += generate(4); // ext (4) : 161/507
  entry = fill_up_to_nth_char("", 7);
  row_str += entry; // space (7) : 168/507
  row_str += generate(10); // number (10) : 178/507
  row_str += generate(16); // number (16) : 194/507
  row_str += generate(4); // number (4) : 198/507
  row_str += generate(4); // number (4) : 202/507
  assert(row_str.length == 202);
  row_str += getFormattedDate(faker.date.past()) // date (10) : 212/507
  row_str += "EN"; // language (2) : 214/507
  row_str += (generate(5) + " "); // number + space (5 + 1 = 6) : 220/507
  row_str += "A"; // letter (1) : 221/507
  row_str += "B"; // letter (1) : 222/507
  row_str += " "; // space (1) : 223/507
  row_str += " "; // space (1) : 224/507
  entry = fill_up_to_nth_char("", 10);
  row_str += entry; // space (10) : 234/507
  entry = fill_up_to_nth_char("", 10);
  row_str += entry; // space (10) : 244/507
  entry = fill_up_to_nth_char("", 4);
  row_str += entry; // space (4) : 248/507
  row_str += generate(10) + " "; // number + space (10 + 1 = 11) : 259/507
  entry = fill_up_to_nth_char("", 3);
  row_str += entry; // space (3) : 262/507
  entry = fill_up_to_nth_char("", 1);
  row_str += entry; // space (1) : 263/507
  entry = fill_up_to_nth_char("", 1);
  row_str += entry; // space (1) : 264/507
  row_str += generate(2); // number (2) : 266/507
  row_str += getFormattedDate(faker.date.past()) // date (10) : 276/507
  row_str += getFormattedDate(faker.date.past()) // date (10) : 286/507
  row_str += getFormattedDate(faker.date.past()) // date (10) : 296/507
  row_str += "C"; // letter (1) : 297/507
  row_str += "D"; // letter (1) : 298/507
  row_str += getFormattedDate(faker.date.past()) // date (10) : 308/507
  assert(row_str.length == 308);
  entry = fill_up_to_nth_char("", 20);
  row_str += entry; // space (20) : 328/507
  entry = fill_up_to_nth_char("", 10);
  row_str += entry; // space (10) : 338/507
  entry = fill_up_to_nth_char("", 1);
  row_str += entry; // space (1) : 339/507
  entry = fill_up_to_nth_char("", 1);
  row_str += entry; // space (1) : 340/507
  entry = fill_up_to_nth_char("", 1);
  row_str += entry; // space (1) : 341/507
  entry = fill_up_to_nth_char("", 1);
  row_str += entry; // space (1) : 342/507
  entry = fill_up_to_nth_char("", 15);
  row_str += entry; // space (15) : 357/507
  row_str += generate(16); // number (16) : 373/507
  row_str += getFormattedDate(faker.date.past()) // date (10) : 383/507
  assert(row_str.length == 383);
  entry = faker.internet.email();
  row_str += fill_up_to_nth_char(entry, 50); // email (50) : 433/507
  row_str += generate(13); // number (13) : 446/507
  row_str += "E"; // letter (1) : 447/507
  assert(row_str.length == 447);
  // console.log("-----------");
  // console.log(row_str.length);
  // row_str += new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen(); // random string (60) : 507/507
  row_str += "aaaaaAAAAAbbbbbBBBBBcccccCCCCCdddddDDDDDeeeeeEEEEEfffffFFFFF"; // random string (60) : 507/507
  assert(row_str.length == 507);
  return row_str;
}
// Make no dupes full file

file_name = "data-full-no-dupes.txt";

var stream = fs.createWriteStream(file_name);
stream.once('open', function(fd) {
  var num_lines = 300000;
  for (var i = 0; i < num_lines; i++) {
    if (i % (num_lines / 5) == 0) {
      console.log("i: " + i.toString() + " / " + num_lines.toString());
    }
    stream.write(create_regular_row_random() + "\n");
  }
  stream.end();
});

console.log("MADE IT!");