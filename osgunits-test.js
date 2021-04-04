const assert = require("assert");
const {
  Speed,
  Distance,
  Duration,
  Pressure,
  FuelRate,
  Acceleration,
  Temperature,
  FlowRate,
  Volume,
} = require("./osgunits-gen.js");

module.exports.TestUnits_RunAllTests = function () {
  TestSpeed_RunAllTests()
  TestDistance_RunAllTests()
  TestDuration_RunAllTests()
  TestPressure_RunAllTests()
  TestFuelRate_RunAllTests()
  TestAcceleration_RunAllTests()
  TestTemperature_RunAllTests()
  TestFlowRate_RunAllTests()
  TestVolume_RunAllTests()
}

const TestSpeed_RunAllTests = function () {
  TestSpeed_NumberStringArgs();
  TestSpeed_StringArg();
  TestSpeed_ObjectArg();
  TestSpeed_EmptyArg();
  TestSpeed_Set();
  TestSpeed_ConvertToUnit();
  TestSpeed_Add();
  TestSpeed_Compare();
};

function TestSpeed_NumberStringArgs() {
  console.log("#1 Testing Speed class - Number String Args");

  // test standard number string args
  const standard_speed = new Speed(10, "mph");
  assert.strictEqual(true, standard_speed.isValid());
  assert.strictEqual(false, standard_speed.isEmpty());
  assert.strictEqual(10, standard_speed.value);
  assert.strictEqual("mph", standard_speed.unit);
  assert.strictEqual("10 mph", standard_speed.display);

  // test number string args with excess unit spacing
  const outer_spacing_unit = new Speed(2.23, "  cm/s  ");
  assert.strictEqual(true, outer_spacing_unit.isValid());
  assert.strictEqual(false, outer_spacing_unit.isEmpty());
  assert.strictEqual(2.23, outer_spacing_unit.value);
  assert.strictEqual("cm/s", outer_spacing_unit.unit);
  assert.strictEqual("2.23 cm/s", outer_spacing_unit.display);

  // test negative value
  const negative_value = new Speed(-6.5, "mph");
  assert.strictEqual(true, negative_value.isValid());
  assert.strictEqual(false, negative_value.isEmpty());
  assert.strictEqual(-6.5, negative_value.value);
  assert.strictEqual("mph", negative_value.unit);
  assert.strictEqual("-6.5 mph", negative_value.display);

  // test bad values
  assert.throws(() => {
    new Speed(Infinity, "km/h");
  }, Error);
  assert.throws(() => {
    new Speed(NaN, "km/h");
  }, Error);

  // test invalid units
  assert.throws(() => {
    new Speed(10, "asdf");
  }, Error);
  assert.throws(() => {
    new Speed(10, "m p h");
  }, Error);

  console.log("Test #1 Success");
}

function TestSpeed_StringArg() {
  console.log("#2 Testing Speed class - String Argument");
  // test create speed with string with space
  const space_string = new Speed("2.5 km/h");
  assert.strictEqual(true, space_string.isValid());
  assert.strictEqual(false, space_string.isEmpty());
  assert.strictEqual(2.5, space_string.value);
  assert.strictEqual("km/h", space_string.unit);
  assert.strictEqual("2.5 km/h", space_string.display);

  // test create speed with no space
  const no_space_string = new Speed("6.789m/s");
  assert.strictEqual(true, no_space_string.isValid());
  assert.strictEqual(false, no_space_string.isEmpty());
  assert.strictEqual(6.789, no_space_string.value);
  assert.strictEqual("m/s", no_space_string.unit);
  assert.strictEqual("6.789 m/s", no_space_string.display);

  // test string with excess whitespace
  const trim_space_string = new Speed("    10.2     cm/s   ");
  assert.strictEqual(true, trim_space_string.isValid());
  assert.strictEqual(false, trim_space_string.isEmpty());
  assert.strictEqual(10.2, trim_space_string.value);
  assert.strictEqual("cm/s", trim_space_string.unit);
  assert.strictEqual("10.2 cm/s", trim_space_string.display);

  // test create speed with negative number
  const negative_value_string = new Speed("-3.5m/s");
  assert.strictEqual(true, negative_value_string.isValid());
  assert.strictEqual(false, negative_value_string.isEmpty());
  assert.strictEqual(-3.5, negative_value_string.value);
  assert.strictEqual("m/s", negative_value_string.unit);
  assert.strictEqual("-3.5 m/s", negative_value_string.display);

  // test bad string input
  assert.throws(() => {
    new Speed("a23mph");
  }, Error);

  assert.throws(() => {
    new Speed("23amph");
  }, Error);
  assert.throws(() => {
    new Speed("23mpha");
  }, Error);

  console.log("Test #2 Success");
}

function TestSpeed_ObjectArg() {
  console.log("#3 Testing Speed class - Object Arguments");

  // test speed object with three args
  const three_args = new Speed({
    value: 10,
    unit: "mph",
    "display ": "10 mph"
  });
  assert.strictEqual(true, three_args.isValid());
  assert.strictEqual(false, three_args.isEmpty());
  assert.strictEqual(10, three_args.value);
  assert.strictEqual("mph", three_args.unit);
  assert.strictEqual("10 mph", three_args.display);

  // test speed object with two args
  const two_args = new Speed({ value: 4, unit: "m/s" });
  assert.strictEqual(true, two_args.isValid());
  assert.strictEqual(false, two_args.isEmpty());
  assert.strictEqual(4, two_args.value);
  assert.strictEqual("m/s", two_args.unit);
  assert.strictEqual("4 m/s", two_args.display);

  // test create with speed object
  const first = new Speed({
    value: 25,
    unit: "km/h",
    display: "25 km/h"
  });

  const second = new Speed(first);
  assert.strictEqual(true, second.isValid());
  assert.strictEqual(false, second.isEmpty());
  assert.strictEqual(25, second.value);
  assert.strictEqual("km/h", second.unit);
  assert.strictEqual("25 km/h", second.display);

  // test bad number of props
  assert.throws(() => {
    new Speed({ value: 25 });
  }, Error);
  assert.throws(() => {
    new Speed({
      value: 10,
      unit: "mph",
      display: "10 mph",
      random_prop: 10
    });
  }, Error);

  // test bad object format
  assert.throws(() => {
    new Speed({
      value: 10,
      unit: "asdfa",
      display: "10 mph"
    });
  }, Error);
  assert.throws(() => {
    new Speed({
      value: "10",
      unit: "cm/s",
      "display ": "10 cm/s"
    });
  }, Error);

  console.log("Test #3 Success");
}

function TestSpeed_EmptyArg() {
  console.log("#4 Testing Speed class - Empty Argument");
  // test creating speed object with empty object
  const empty = new Speed({});

  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}

function TestSpeed_Set() {
  console.log("#5 Testing Speed class - Set");
  const five = new Speed("5mph");

  assert.strictEqual(10, five.set(10).value);
  assert.strictEqual("10 mph", five.set(10).display);
  assert.strictEqual("13 km/h", five.set(13, "km/h").display);
  assert.strictEqual(
    "-100 cm/s",
    five.set({ value: -100, unit: "cm/s" }).display
  );

  const empty = new Speed({});
  assert.strictEqual("11 km/h", five.set("11km/h").display);

  assert.throws(() => {
    //set without unit
    empty.set(11);
  });
  console.log("Test #5 Success");
}

function TestSpeed_ConvertToUnit() {
  console.log("#6 Testing Speed class - Convert to unit");

  // toUnit with string arg
  const speed_miles = new Speed("10mph");
  assert.strictEqual(
    "16.0934 km/h",
    speed_miles.toUnit("km/h").round(4).display
  );
  assert.strictEqual("4.4704 m/s", speed_miles.toUnit("m/s").displayRounded(4));
  assert.strictEqual(
    "447.04 cm/s",
    speed_miles.toUnit("cm/s").displayRounded(2)
  );

  /* // unit conversion with unit funcs
  const speed_meters_per_sec = new Speed(24, "m/s");
  assert.strictEqual("86.4", speed_meters_per_sec.toKmPerH().value.toFixed(1));
  assert.strictEqual("km/h", speed_meters_per_sec.toKmPerH().unit);
  assert.strictEqual(
    "53.687 mph",
    speed_meters_per_sec.toMph().displayRounded(3)
  );
  assert.strictEqual(
    "2400 cm/s",
    speed_meters_per_sec.toCmPerSecond().displayRounded(0)
  ); */

  //toUnit errors
  assert.throws(() => {
    //bad unit arg
    const speed_km_per_hour = new Speed(5, "km/h");
    speed_km_per_hour.toUnit("mi/h");
  });
  assert.throws(() => {
    //bad unit setting
    const bad_unit_setting_speed = new Speed(5, "km/h");
    bad_unit_setting_speed.unit = "asdf";
    speed_km_per_hour.toUnit("mph");
  });
  assert.throws(() => {
    //bad value setting
    const bad_unit_setting_speed = new Speed(5, "km/h");
    bad_unit_setting_speed.value = "12abc";
    bad_unit_setting_speed.toUnit("mph").display;
  });
  console.log("Test #6 Success");
}

function TestSpeed_Add() {
  console.log("#7 Testing Speed class - Add value");
  const speed_miles = new Speed("10mph");

  //test same unit
  assert.strictEqual(20, speed_miles.add(10).value);
  assert.strictEqual("mph", speed_miles.add(10).unit);
  assert.strictEqual("20 mph", speed_miles.add(10).display);
  assert.strictEqual("20 mph", speed_miles.add("10mph").display);
  assert.strictEqual(
    "25 mph",
    speed_miles.add({ value: 15, unit: "mph" }).display
  );

  //test add unit convert
  assert.strictEqual("16.2 mph", speed_miles.add("10 km/h").displayRounded(1));
  assert.strictEqual(
    "-1.18 mph",
    speed_miles.add("-500 cm/s").displayRounded(2)
  );

  console.log("Test #7 Success");
}

function TestSpeed_Compare() {
  console.log("#8 Testing Speed class - Compare");
  const five = new Speed("5mph");
  const ten_mph = new Speed("10 mph");
  const ten_kph = new Speed("10 km/h");
  const three_meter_per_sec = new Speed(3, "m/s");
  const equivalent_cm_per_sec = new Speed(300, "cm/s"); //equivalent to 3m/s

  assert.strictEqual(-1, five.cmp(ten_mph));
  assert.strictEqual(1, ten_mph.cmp(five));
  assert.strictEqual(1, ten_kph.cmp(five));
  assert.strictEqual(-1, five.cmp(ten_kph));
  assert.strictEqual(1, ten_mph.cmp(ten_kph));
  assert.strictEqual(1, ten_mph.cmp(three_meter_per_sec));
  assert.strictEqual(-1, ten_kph.cmp(three_meter_per_sec));
  //assert.strictEqual(0, five.cmp(five));
  assert.strictEqual(0, three_meter_per_sec.cmp(equivalent_cm_per_sec));

  assert.strictEqual(0, five.cmp(5));
  assert.strictEqual(-1, five.cmp(6));
  assert.strictEqual(1, five.cmp(-3));

  assert.throws(() => {
    const bad_speed = new Speed("5mph");
    bad_speed.value = null;
    bad_speed.cmp(ten_mph);
  });
  console.log("Test #8 Success");
}

const TestDistance_RunAllTests = function () {
  TestDistance_NumberStringArgs();
  TestDistance_StringArg();
  TestDistance_ObjectArg();
  TestDistance_EmptyArg();
  TestDistance_Set();
  TestDistance_ConvertToUnit();
  TestDistance_Add();
  TestDistance_Compare();
};

function TestDistance_NumberStringArgs() {
  console.log("#1 Testing Distance class - Number String Args");

  // test standard number string args
  const standard_distance = new Distance(10, "mi");
  assert.strictEqual(true, standard_distance.isValid());
  assert.strictEqual(false, standard_distance.isEmpty());
  assert.strictEqual(10, standard_distance.value);
  assert.strictEqual("mi", standard_distance.unit);
  assert.strictEqual("10 mi", standard_distance.display);

  // test number string args with excess unit spacing
  const outer_spacing_unit = new Distance(2.23, "  km  ");
  assert.strictEqual(true, outer_spacing_unit.isValid());
  assert.strictEqual(false, outer_spacing_unit.isEmpty());
  assert.strictEqual(2.23, outer_spacing_unit.value);
  assert.strictEqual("km", outer_spacing_unit.unit);
  assert.strictEqual("2.23 km", outer_spacing_unit.display);

  // test negative value
  const negative_value = new Distance(-6.5, "m");
  assert.strictEqual(true, negative_value.isValid());
  assert.strictEqual(false, negative_value.isEmpty());
  assert.strictEqual(-6.5, negative_value.value);
  assert.strictEqual("m", negative_value.unit);
  assert.strictEqual("-6.5 m", negative_value.display);

  // test small distance units
  const millimeters = new Distance(22, "mm");
  assert.strictEqual(true, millimeters.isValid());
  assert.strictEqual(false, millimeters.isEmpty());
  assert.strictEqual(22, millimeters.value);
  assert.strictEqual("mm", millimeters.unit);
  assert.strictEqual("22 mm", millimeters.display);

  const centimeters = new Distance(12, "cm");
  assert.strictEqual(true, centimeters.isValid());
  assert.strictEqual(false, centimeters.isEmpty());
  assert.strictEqual(12, centimeters.value);
  assert.strictEqual("cm", centimeters.unit);
  assert.strictEqual("12 cm", centimeters.display);

  // test bad values
  assert.throws(() => {
    new Distance(Infinity, "mi");
  }, Error);
  assert.throws(() => {
    new Distance(NaN, "km");
  }, Error);

  // test invalid units
  assert.throws(() => {
    new Distance(10, "asdf");
  }, Error);
  assert.throws(() => {
    new Distance(10, "k m");
  }, Error);

  console.log("Test #1 Success");
}

function TestDistance_StringArg() {
  console.log("#2 Testing Distance class - String Argument");
  // test create distance with string with space
  const space_string = new Distance("2.5 km");
  assert.strictEqual(true, space_string.isValid());
  assert.strictEqual(false, space_string.isEmpty());
  assert.strictEqual(2.5, space_string.value);
  assert.strictEqual("km", space_string.unit);
  assert.strictEqual("2.5 km", space_string.display);

  // test create distance with no space
  const no_space_string = new Distance("6.789m");
  assert.strictEqual(true, no_space_string.isValid());
  assert.strictEqual(false, no_space_string.isEmpty());
  assert.strictEqual(6.789, no_space_string.value);
  assert.strictEqual("m", no_space_string.unit);
  assert.strictEqual("6.789 m", no_space_string.display);

  // test string with excess whitespace
  const trim_space_string = new Distance("    10.2     mi   ");
  assert.strictEqual(true, trim_space_string.isValid());
  assert.strictEqual(false, trim_space_string.isEmpty());
  assert.strictEqual(10.2, trim_space_string.value);
  assert.strictEqual("mi", trim_space_string.unit);
  assert.strictEqual("10.2 mi", trim_space_string.display);

  // test create distance with negative number
  const negative_value_string = new Distance("-3.5m");
  assert.strictEqual(true, negative_value_string.isValid());
  assert.strictEqual(false, negative_value_string.isEmpty());
  assert.strictEqual(-3.5, negative_value_string.value);
  assert.strictEqual("m", negative_value_string.unit);
  assert.strictEqual("-3.5 m", negative_value_string.display);

  // test inches
  const inches = new Distance("15 in");
  assert.strictEqual(true, inches.isValid());
  assert.strictEqual(false, inches.isEmpty());
  assert.strictEqual(15, inches.value);
  assert.strictEqual("in", inches.unit);
  assert.strictEqual("15 in", inches.display);

  // test bad string input
  assert.throws(() => {
    new Distance("a23mi");
  }, Error);

  assert.throws(() => {
    new Distance("23ami");
  }, Error);
  assert.throws(() => {
    new Distance("23mia");
  }, Error);

  console.log("Test #2 Success");
}

function TestDistance_ObjectArg() {
  console.log("#3 Testing Distance class - Object Arguments");

  // test object with three args
  const three_args = new Distance({
    value: 10,
    unit: "mi",
    display: "10 mi"
  });
  assert.strictEqual(true, three_args.isValid());
  assert.strictEqual(false, three_args.isEmpty());
  assert.strictEqual(10, three_args.value);
  assert.strictEqual("mi", three_args.unit);
  assert.strictEqual("10 mi", three_args.display);

  // test object with two args
  const two_args = new Distance({ value: 4, unit: "m" });
  assert.strictEqual(true, two_args.isValid());
  assert.strictEqual(false, two_args.isEmpty());
  assert.strictEqual(4, two_args.value);
  assert.strictEqual("m", two_args.unit);
  assert.strictEqual("4 m", two_args.display);

  // test create with object
  const first = new Distance({
    value: 25,
    unit: "km",
    display: "25 km"
  });

  const second = new Distance(first);
  assert.strictEqual(true, second.isValid());
  assert.strictEqual(false, second.isEmpty());
  assert.strictEqual(25, second.value);
  assert.strictEqual("km", second.unit);
  assert.strictEqual("25 km", second.display);

  // test bad number of props
  assert.throws(() => {
    new Distance({ value: 25 });
  }, Error);
  assert.throws(() => {
    new Distance({
      value: 10,
      unit: "mi",
      display: "10 mi",
      random_prop: 10
    });
  }, Error);

  // test bad object format
  assert.throws(() => {
    new Distance({
      value: 10,
      unit: "asdfa",
      display: "10 mi"
    });
  }, Error);
  assert.throws(() => {
    new Distance({
      value: "10",
      unit: "km",
      "display ": "10 km"
    });
  }, Error);

  console.log("Test #3 Success");
}

function TestDistance_EmptyArg() {
  console.log("#4 Testing Distance class - Empty Argument");
  // test creating Distance object with empty object
  const empty = new Distance({});

  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}

function TestDistance_Set() {
  console.log("#5 Testing Distance class - Set");
  const five = new Distance("5mi");

  assert.strictEqual(10, five.set(10).value);
  assert.strictEqual("10 mi", five.set(10).display);
  assert.strictEqual("13 km", five.set(13, "km").display);
  assert.strictEqual("-100 m", five.set({ value: -100, unit: "m" }).display);

  const empty = new Distance({});
  assert.strictEqual("11 km", five.set("11km").display);

  assert.throws(() => {
    //set without unit
    empty.set(11);
  });
  console.log("Test #5 Success");
}

function TestDistance_ConvertToUnit() {
  console.log("#6 Testing Distance class - Convert to unit");

  // toUnit with string arg
  const distance_miles = new Distance("10mi");
  assert.strictEqual(
    "16.0934 km",
    distance_miles.toUnit("km").displayRounded(4)
  );
  assert.strictEqual("16093.4 m", distance_miles.toUnit("m").displayRounded(1));

  // toUnit centimeters
  const centimeters = new Distance("10cm");
  assert.strictEqual("0.10 m", centimeters.toUnit("m").displayRounded(2));

  // toUnit inches
  const inches = new Distance("20 in");
  assert.strictEqual("508.0 mm", inches.toUnit("mm").displayRounded(1));

  //toUnit errors
  assert.throws(() => {
    //bad unit arg
    const distance_km_per_hour = new Distance(5, "kma");
    distance_km_per_hour.toUnit("mi");
  });
  assert.throws(() => {
    //bad unit setting
    const bad_unit_setting_distance = new Distance(5, "km");
    bad_unit_setting_distance.unit = "asdf";
    bad_unit_setting_distance.toUnit("mi");
  });
  assert.throws(() => {
    //bad value setting
    const bad_unit_setting_distance = new Distance(5, "km");
    bad_unit_setting_distance.value = "12abc";
    bad_unit_setting_distance.toUnit("mi").display;
  });
  console.log("Test #6 Success");
}

function TestDistance_Add() {
  console.log("#7 Testing Distance class - Add value");
  const distance = new Distance("10mi");

  //test same unit
  assert.strictEqual(20, distance.add(10).value);
  assert.strictEqual("mi", distance.add(10).unit);
  assert.strictEqual("20 mi", distance.add(10).display);
  assert.strictEqual("20 mi", distance.add("10mi").display);
  assert.strictEqual("25 mi", distance.add({ value: 15, unit: "mi" }).display);

  //test add unit convert
  assert.strictEqual("16.2 mi", distance.add("10 km").displayRounded(1));
  assert.strictEqual("9.69 mi", distance.add("-500 m").displayRounded(2));

  console.log("Test #7 Success");
}

function TestDistance_Compare() {
  console.log("#8 Testing Distance class - Compare");
  const five = new Distance("5mi");
  const ten_mile = new Distance("10 mi");
  const ten_km = new Distance("10 km");
  const three_meter = new Distance(3, "m");

  assert.strictEqual(-1, five.cmp(ten_mile));
  assert.strictEqual(1, ten_mile.cmp(five));
  assert.strictEqual(1, ten_km.cmp(five));
  assert.strictEqual(-1, five.cmp(ten_km));
  assert.strictEqual(1, ten_mile.cmp(ten_km));
  assert.strictEqual(1, ten_mile.cmp(three_meter));
  assert.strictEqual(-1, three_meter.cmp(ten_km));

  assert.strictEqual(0, five.cmp(5));
  assert.strictEqual(-1, five.cmp(6));
  assert.strictEqual(1, five.cmp(-3));

  assert.throws(() => {
    const bad_distance = new Distance("5mi");
    bad_distance.value = null;
    bad_distance.cmp(ten_mile);
  });
  console.log("Test #8 Success");
}

const TestDuration_RunAllTests = function () {
  TestDuration_NumberStringArgs();
  TestDuration_StringArg();
  TestDuration_ObjectArg();
  TestDuration_EmptyArg();
  TestDuration_Set();
  TestDuration_ConvertToUnit();
  TestDuration_Add();
  TestDuration_Compare();
};

function TestDuration_NumberStringArgs() {
  console.log("#1 Testing Duration class - NumberStringArgs");
  const time_seconds = new Duration(135, "s");
  assert.strictEqual("135s", time_seconds.display);
  const time_minutes = new Duration(250, "m");
  assert.strictEqual("250m 0s", time_minutes.display);
  const time_minute_decimal = new Duration(10.5, "m");
  assert.strictEqual("10m 30s", time_minute_decimal.display);
  const time_hours = new Duration(1.505, "h");
  assert.strictEqual("1h 30m 18s", time_hours.display);
  const time_milliseconds = new Duration(500, "ms");
  assert.strictEqual("500ms", time_milliseconds.display);
  const negative_duration = new Duration(-10.5, "m");
  assert.strictEqual(-10.5, negative_duration.value);
  assert.strictEqual("m", negative_duration.unit);
  assert.strictEqual("-10m 30s", negative_duration.display);

  console.log("Test #1 Success");
}
function TestDuration_StringArg() {
  console.log("#2 Testing Duration class - StringArg");
  const duration_hours = new Duration("10h 5m 3s");
  assert.strictEqual("10.08", duration_hours.value.toFixed(2));
  assert.strictEqual("h", duration_hours.unit);
  assert.strictEqual("10h 5m 3s", duration_hours.display);

  const duration_minutes = new Duration("5m3s");
  assert.strictEqual(5.05, duration_minutes.value);
  assert.strictEqual("m", duration_minutes.unit);
  assert.strictEqual("5m 3s", duration_minutes.display);

  const duration_minutes_no_seconds = new Duration("5m");
  assert.strictEqual(5, duration_minutes_no_seconds.value);
  assert.strictEqual("m", duration_minutes_no_seconds.unit);
  assert.strictEqual("5m 0s", duration_minutes_no_seconds.display);

  const negative_duration = new Duration("-10m0s");
  assert.strictEqual(-10, negative_duration.value);
  assert.strictEqual("m", negative_duration.unit);
  assert.strictEqual("-10m 0s", negative_duration.display);

  const negative_milliseconds = new Duration("-55.5ms");
  assert.strictEqual(-55.5, negative_milliseconds.value);
  assert.strictEqual("ms", negative_milliseconds.unit);
  assert.strictEqual("-56ms", negative_milliseconds.display);

  console.log("Test #2 Success");
}
function TestDuration_ObjectArg() {
  console.log("#3 Testing Duration class - ObjectArg");
  const five = new Duration({ value: 5, unit: "h" });
  assert.strictEqual("5h 0m 0s", five.display);
  console.log("Test #3 Success");
}
function TestDuration_EmptyArg() {
  console.log("#4 Testing Duration class - EmptyArg");
  const empty = new Duration({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestDuration_Set() {
  console.log("#5 Testing Duration class - Set");
  const five = new Duration(5, "m");
  assert.strictEqual("10s", five.set("10s").display);
  console.log("Test #5 Success");
}
function TestDuration_ConvertToUnit() {
  console.log("#6 Testing Duration class - ConvertToUnit");
  const ninety = new Duration(90, "s");
  assert.strictEqual(90, ninety.value);
  assert.strictEqual(1.5, ninety.toUnit("m").value);
  assert.strictEqual("1m 30s", ninety.toUnit("m").display);
  console.log("Test #6 Success");
}
function TestDuration_Add() {
  console.log("#7 Testing Duration class - Add");
  const sixty = new Duration(60, "s");
  const two = new Duration(2, "m");
  assert.strictEqual("180s", sixty.add(two).display);
  console.log("Test #7 Success");
}
function TestDuration_Compare() {
  console.log("#8 Testing Duration class - Compare");
  const three_hundred_seconds = new Duration(300, "s");
  const two_min = new Duration(2, "m");
  assert.strictEqual(1, three_hundred_seconds.cmp(two_min));
  console.log("Test #8 Success");
}

const TestPressure_RunAllTests = function () {
  TestPressure_NumberStringArgs();
  TestPressure_StringArg();
  TestPressure_ObjectArg();
  TestPressure_EmptyArg();
  TestPressure_Set();
  TestPressure_ConvertToUnit();
  TestPressure_Add();
  TestPressure_Compare();
};

function TestPressure_NumberStringArgs() {
  console.log("#1 Testing Pressure class - NumberStringArgs");
  const five = new Pressure(5, "pa");
  assert.strictEqual("5 pa", five.display);
  console.log("Test #1 Success");
}
function TestPressure_StringArg() {
  console.log("#2 Testing Pressure class - StringArg");
  const five = new Pressure("5psi");
  assert.strictEqual("5 psi", five.display);
  console.log("Test #2 Success");
}
function TestPressure_ObjectArg() {
  console.log("#3 Testing Pressure class - ObjectArg");
  const five = new Pressure({ value: 5, unit: "bar" });
  assert.strictEqual("5 bar", five.display);
  console.log("Test #3 Success");
}
function TestPressure_EmptyArg() {
  console.log("#4 Testing Pressure class - EmptyArg");
  const empty = new Pressure({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestPressure_Set() {
  console.log("#5 Testing Pressure class - Set");
  const five = new Pressure(5, "pa");
  assert.strictEqual("10 kpa", five.set("10kpa").display);
  console.log("Test #5 Success");
}
function TestPressure_ConvertToUnit() {
  console.log("#6 Testing Pressure class - ConvertToUnit");
  const ninety = new Pressure(90, "psi");
  assert.strictEqual("620527.03 pa", ninety.toUnit("pa").displayRounded(2));
  console.log("Test #6 Success");
}
function TestPressure_Add() {
  console.log("#7 Testing Pressure class - Add");
  const sixty = new Pressure(60, "bar");
  const two = new Pressure(2, "kpa");
  assert.strictEqual("60.02 bar", sixty.add(two).display);
  console.log("Test #7 Success");
}
function TestPressure_Compare() {
  console.log("#8 Testing Pressure class - Compare");
  const three_hundred_pa = new Pressure(300, "pa");
  const two_kpa = new Pressure(2.5, "kpa");
  assert.strictEqual(-1, three_hundred_pa.cmp(two_kpa));
  console.log("Test #8 Success");
}

const TestFuelRate_RunAllTests = function () {
  TestFuelRate_NumberStringArgs();
  TestFuelRate_StringArg();
  TestFuelRate_ObjectArg();
  TestFuelRate_EmptyArg();
  TestFuelRate_Set();
  TestFuelRate_ConvertToUnit();
  TestFuelRate_Add();
  TestFuelRate_Compare();
};

function TestFuelRate_NumberStringArgs() {
  console.log("#1 Testing FuelRate class - NumberStringArgs");
  const five = new FuelRate(5, "km/l");
  assert.strictEqual("5 km/l", five.display);
  console.log("Test #1 Success");
}
function TestFuelRate_StringArg() {
  console.log("#2 Testing FuelRate class - StringArg");
  const five = new FuelRate("5mpg");
  assert.strictEqual("5 mpg", five.display);
  console.log("Test #2 Success");
}
function TestFuelRate_ObjectArg() {
  console.log("#3 Testing FuelRate class - ObjectArg");
  const five = new FuelRate({ value: 5, unit: "km/l" });
  assert.strictEqual("5 km/l", five.display);
  console.log("Test #3 Success");
}
function TestFuelRate_EmptyArg() {
  console.log("#4 Testing FuelRate class - EmptyArg");
  const empty = new FuelRate({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestFuelRate_Set() {
  console.log("#5 Testing FuelRate class - Set");
  const five = new FuelRate(5, "mpg");
  assert.strictEqual("10 km/l", five.set("10km/l").display);
  console.log("Test #5 Success");
}
function TestFuelRate_ConvertToUnit() {
  console.log("#6 Testing FuelRate class - ConvertToUnit");
  const ninety = new FuelRate(90, "mpg");
  assert.strictEqual("38.3 km/l", ninety.toUnit("km/l").displayRounded(1));
  console.log("Test #6 Success");
}
function TestFuelRate_Add() {
  console.log("#7 Testing FuelRate class - Add");
  const mpg = new FuelRate(3, "mpg");
  const kmpl = new FuelRate(1.5, "km/l");
  assert.strictEqual("6.53 mpg", mpg.add(kmpl).displayRounded(2));
  console.log("Test #7 Success");
}
function TestFuelRate_Compare() {
  console.log("#8 Testing FuelRate class - Compare");
  const kmpl = new FuelRate(5.5, "km/l");
  const mpg = new FuelRate(1, "mpg");
  assert.strictEqual(1, kmpl.cmp(mpg));
  console.log("Test #8 Success");
}

const TestAcceleration_RunAllTests = function () {
  TestAcceleration_NumberStringArgs();
  TestAcceleration_StringArg();
  TestAcceleration_ObjectArg();
  TestAcceleration_EmptyArg();
  TestAcceleration_Set();
  TestAcceleration_ConvertToUnit();
  TestAcceleration_Add();
  TestAcceleration_Compare();
};

function TestAcceleration_NumberStringArgs() {
  console.log("#1 Testing Acceleration class - NumberStringArgs");
  const five = new Acceleration(5, "cm/s/s");
  assert.strictEqual("5 cm/s/s", five.display);
  console.log("Test #1 Success");
}
function TestAcceleration_StringArg() {
  console.log("#2 Testing Acceleration class - StringArg");
  const five = new Acceleration("5g");
  assert.strictEqual("5 g", five.display);
  console.log("Test #2 Success");
}
function TestAcceleration_ObjectArg() {
  console.log("#3 Testing Acceleration class - ObjectArg");
  const five = new Acceleration({ value: 5, unit: "cm/s/s" });
  assert.strictEqual("5 cm/s/s", five.display);
  console.log("Test #3 Success");
}
function TestAcceleration_EmptyArg() {
  console.log("#4 Testing Acceleration class - EmptyArg");
  const empty = new Acceleration({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestAcceleration_Set() {
  console.log("#5 Testing Acceleration class - Set");
  const five = new Acceleration(5, "g");
  assert.strictEqual("10 cm/s/s", five.set("10cm/s/s").display);
  console.log("Test #5 Success");
}
function TestAcceleration_ConvertToUnit() {
  console.log("#6 Testing Acceleration class - ConvertToUnit");
  const ninety = new Acceleration(90, "g");
  assert.strictEqual(
    "88259.9 cm/s/s",
    ninety.toUnit("cm/s/s").displayRounded(1)
  );
  console.log("Test #6 Success");
}
function TestAcceleration_Add() {
  console.log("#7 Testing Acceleration class - Add");
  const g = new Acceleration(3, "g");
  const cmpsps = new Acceleration(100, "cm/s/s");
  assert.strictEqual("3.1 g", g.add(cmpsps).round(1).display);
  console.log("Test #7 Success");
}
function TestAcceleration_Compare() {
  console.log("#8 Testing Acceleration class - Compare");
  const cmpsps = new Acceleration(5.5, "cm/s/s");
  const g = new Acceleration(1, "g");
  assert.strictEqual(-1, cmpsps.cmp(g));
  console.log("Test #8 Success");
}

const TestTemperature_RunAllTests = function () {
  TestTemperature_NumberStringArgs();
  TestTemperature_StringArg();
  TestTemperature_ObjectArg();
  TestTemperature_EmptyArg();
  TestTemperature_Set();
  TestTemperature_ConvertToUnit();
  TestTemperature_Add();
  TestTemperature_Compare();
};

function TestTemperature_NumberStringArgs() {
  console.log("#1 Testing Temperature class - NumberStringArgs");
  const five = new Temperature(5, "c");
  assert.strictEqual("5°C", five.display);
  console.log("Test #1 Success");
}
function TestTemperature_StringArg() {
  console.log("#2 Testing Temperature class - StringArg");
  const five = new Temperature("5 °F");
  assert.strictEqual("5°F", five.display);

  const six_celsius = new Temperature("6 c");
  assert.strictEqual("6°C", six_celsius.display);
  console.log("Test #2 Success");
}
function TestTemperature_ObjectArg() {
  console.log("#3 Testing Temperature class - ObjectArg");
  const five = new Temperature({ value: 5, unit: "c" });
  assert.strictEqual("5°C", five.display);
  console.log("Test #3 Success");
}
function TestTemperature_EmptyArg() {
  console.log("#4 Testing Temperature class - EmptyArg");
  const empty = new Temperature({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestTemperature_Set() {
  console.log("#5 Testing Temperature class - Set");
  const five = new Temperature(5, "c");
  assert.strictEqual("10°F", five.set("10f").display);
  console.log("Test #5 Success");
}
function TestTemperature_ConvertToUnit() {
  console.log("#6 Testing Temperature class - ConvertToUnit");
  const temp_f = new Temperature(90, "f");
  assert.strictEqual("32.22°C", temp_f.toUnit("c").displayRounded(2));
  const temp_c = new Temperature(-11, "c");
  assert.strictEqual("12.2°F", temp_c.toUnit("f").round(1).display);
  console.log("Test #6 Success");
}
function TestTemperature_Add() {
  console.log("#7 Testing Temperature class - Add");
  const three_c = new Temperature(3, "c");
  const thirty_f = new Temperature(30, "f");
  assert.strictEqual("1.89°C", three_c.add(thirty_f).displayRounded(2));
  console.log("Test #7 Success");
}
function TestTemperature_Compare() {
  console.log("#8 Testing Temperature class - Compare");
  const five_point_five_f = new Temperature(5.5, "f");
  const one_c = new Temperature(1, "c");
  assert.strictEqual(-1, five_point_five_f.cmp(one_c));
  console.log("Test #8 Success");
}

const TestFlowRate_RunAllTests = function () {
  TestFlowRate_NumberStringArgs();
  TestFlowRate_StringArg();
  TestFlowRate_ObjectArg();
  TestFlowRate_EmptyArg();
  TestFlowRate_Set();
  TestFlowRate_ConvertToUnit();
  TestFlowRate_Add();
  TestFlowRate_Compare();
};

function TestFlowRate_NumberStringArgs() {
  console.log("#1 Testing FlowRate class - NumberStringArgs");
  const five = new FlowRate(5, "ml/h");
  assert.strictEqual("5 ml/h", five.display);
  console.log("Test #1 Success");
}
function TestFlowRate_StringArg() {
  console.log("#2 Testing FlowRate class - StringArg");
  const five = new FlowRate("5ml/h");
  assert.strictEqual("5 ml/h", five.display);
  console.log("Test #2 Success");
}
function TestFlowRate_ObjectArg() {
  console.log("#3 Testing FlowRate class - ObjectArg");
  const five = new FlowRate({ value: 5, unit: "ml/h" });
  assert.strictEqual("5 ml/h", five.display);
  console.log("Test #3 Success");
}
function TestFlowRate_EmptyArg() {
  console.log("#4 Testing FlowRate class - EmptyArg");
  const empty = new FlowRate({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestFlowRate_Set() {
  console.log("#5 Testing FlowRate class - Set");
  const a = new FlowRate(5, "ml/h");
  assert.strictEqual("10 ml/h", a.set("10ml/h").display);
  console.log("Test #5 Success");
}
function TestFlowRate_ConvertToUnit() {
  console.log("#6 Testing FlowRate class - ConvertToUnit");
  const a = new FlowRate(10, "ml/h");
  assert.strictEqual("10.00 ml/h", a.toUnit("ml/h").displayRounded(2));
  console.log("Test #6 Success");
}
function TestFlowRate_Add() {
  console.log("#7 Testing FlowRate class - Add");
  const a = new FlowRate(3, "ml/h");
  const b = new FlowRate(30, "ml/h");
  assert.strictEqual("33.00 ml/h", a.add(b).displayRounded(2));
  console.log("Test #7 Success");
}
function TestFlowRate_Compare() {
  console.log("#8 Testing FlowRate class - Compare");
  const a = new FlowRate(5.5, "ml/h");
  const b = new FlowRate(1, "ml/h");
  assert.strictEqual(1, a.cmp(b));
  console.log("Test #8 Success");
}


const TestVolume_RunAllTests = function () {
  TestVolume_NumberStringArgs();
  TestVolume_StringArg();
  TestVolume_ObjectArg();
  TestVolume_EmptyArg();
  TestVolume_Set();
  TestVolume_ConvertToUnit();
  TestVolume_Add();
  TestVolume_Compare();
};

function TestVolume_NumberStringArgs() {
  console.log("#1 Testing Volume class - NumberStringArgs");
  const five = new Volume(5, "ml");
  assert.strictEqual("5 ml", five.display);
  console.log("Test #1 Success");
}
function TestVolume_StringArg() {
  console.log("#2 Testing Volume class - StringArg");
  const five = new Volume("5l");
  assert.strictEqual("5 l", five.display);
  console.log("Test #2 Success");
}
function TestVolume_ObjectArg() {
  console.log("#3 Testing Volume class - ObjectArg");
  const five = new Volume({ value: 5, unit: "l" });
  assert.strictEqual("5 l", five.display);
  console.log("Test #3 Success");
}
function TestVolume_EmptyArg() {
  console.log("#4 Testing Volume class - EmptyArg");
  const empty = new Volume({});
  assert.strictEqual(true, empty.isEmpty());
  assert.strictEqual(false, empty.isValid());
  assert.strictEqual(0, Object.keys(empty).length);
  assert.strictEqual(undefined, empty.value);
  assert.strictEqual(undefined, empty.unit);
  assert.strictEqual(undefined, empty.display);
  console.log("Test #4 Success");
}
function TestVolume_Set() {
  console.log("#5 Testing Volume class - Set");
  const a = new Volume(5, "floz");
  assert.strictEqual("10 g", a.set("10g").display);
  console.log("Test #5 Success");
}
function TestVolume_ConvertToUnit() {
  console.log("#6 Testing Volume class - ConvertToUnit");
  const a = new Volume(100, "floz");
  assert.strictEqual("2.96 l", a.toUnit("l").displayRounded(2));
  console.log("Test #6 Success");
}
function TestVolume_Add() {
  console.log("#7 Testing Volume class - Add");
  const a = new Volume(300, "ml");
  const b = new Volume(1, "l");
  assert.strictEqual("1300.00 ml", a.add(b).displayRounded(2));
  console.log("Test #7 Success");
}
function TestVolume_Compare() {
  console.log("#8 Testing Volume class - Compare");
  const a = new Volume(5.5, "ml");
  const b = new Volume(1, "g");
  assert.strictEqual(-1, a.cmp(b));
  console.log("Test #8 Success");
}