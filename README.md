# units

Units is a Javascript unit conversion and utility library built to support the OneStepGPS tracking platform and API. This library can be used in both the browser and with Node.js.

Currently this library supports the following types: Distance, Speed, Duration, Pressure, Fuel Rate, Acceleration, Temperature

## Installation

Install this package using npm:

```
$ npm install @onestepgps/units
```

## Usage

Units objects can be created in a few different ways.

```javascript
import { Distance } from "@onestepgps/units";

let my_distance = new Distance(10, "mi"); //two arguments, value and unit
let my_distance = new Distance("10mi"); //single string argument
let my_distance = new Distance({ value: 10, unit: "mi" }); //single object argument
```

All Units objects have the following three properties:

```javascript
my_distance.value; // 10
my_distance.unit; // 'mi'
my_distance.display; // '10 mi'
```

### Set

The `set` function should be used to change the internal value of a units object. This function will accept the same inputs as the constructer.

```javascript
my_distance.set(15, "km").display; // '15 km'
my_distance.set("120m").display; // '120 m'
my_distance.set({ value: 25, unit: "mi" }).display; // '25 mi'
```

Aditionally, a single `Number` argument can be used to set the value property if the object has a valid unit.

```javascript
let my_distance = new Speed("10km");
my_distance.set(33).display; // '33 km'
```

The value and unit can also be manually updated, but this is discouraged because the display property will not be automatically updated. Use the function updateDisplay to set the display to reflect manual changes to unit/value.

```javascript
let my_distance = new Speed("10 km");
my_distance.value = 2;
my_distance.unit = "mi";
my_distance.display; // '10 km'
my_distance.updateDisplay();
my_distance.display; // '2 mi'
```

### Add

The `add` function is used to add objects together, and will accept the same format of arguments as the `set` function. Objects of the same type but with different units can be added. Note that the function `displayRounded` is also used below, which returns the display property with the value rounded to the given number of decimal points

```javascript
let my_speed = new Speed("2mph");

my_speed.add(3).display; // '5mph'
my_speed.add(5, "mph").display; // '7 mph'
my_speed.add("1 km/h").displayRounded(3); // '2.621 mph'
my_speed.add(new Speed(100, "m/s")).displayRounded(2); // '225.69 mph'
```

### Compare

The function `cmp` is used to compare objects of the same type. Arguments can be in any formats which `set` accepts. Objects of different units can be compared. The `cmp` function will output -1 if it is less than the given value, 1 if greater, and 0 if equal.

```javascript
let my_pressure = new Pressure("10pa");
my_pressure.cmp(20, 'pa'); // -1
my_pressure.cmp(0.5 'kpa'); // 1
```

### Convert to unit

A object can be converted to a different unit with the `toUnit` function, which takes a single unit string argument.

```javascript
let my_temp = new Temperature("75f");
my_temp.toUnit("c").display; // '23.8889 c`
```

### Valid and Empty

A type is 'valid' if it has a Number in its `value` prop, a supported unit in its `unit` prop, and a non-empty string value in its `display` prop. The `isValid` function will return a boolean indicating whether or not the object is 'valid'.

```javascript
let my_dist = new Distance("10mi");
my_dist.isValid(); // true
my_dist.value = null;
my_dist.isValid(); // false
```

The `isEmpty` function is used to check if an object has undefined or null for all its properties. An 'empty' object is by definition not 'valid'.

```javascript
let my_empty_speed = new Speed({});
my_empty_speed.isEmpty(); // true
my_empty_speed.isValid(); // false
```

Note that 'empty' objects will not throw an error upon creation, but all other non 'valid' objects will throw an error on creation.

## Unique types

### Duration

The string representation of `Duration` is slightly different than other types. `Duration` objects can be created with a single string argument using the format shown in the examples below. Note that the largest duration unit given will be the setting of the `unit` property.

```javascript
new Duration("2m").display; // '2m 0s'
new Duration("1h 2m 60s").display; // '1h 3m 0s'
new Duration("85s").display; // '85s'
new Duration("1m85s").display; // '2m 25s'
new Duration("1h2s").display; // '1h 0m 2s'
```

### Temperature

Temperature units are displayed in a slightly different format compared to other types, e.g. `10°F` instead of `10 f`. The Temperature constructor can also accept strings of this format to create new temperature objects.

## Available Types and Units

Distance

- mi - miles
- km - kilometers
- m - meters
- cm - centimeters
- mm - millimeters
- in - inches

Speed

- mph - miles per hour
- km/h - kilometers per hour
- m/s - meters per second
- cm/s - centimeter per second

Duration

- h - hours
- m - minutes
- s - seconds
- ms - milliseconds

Pressure

- pa - pascal
- kpa - kilopascal
- psi - pound per square inch
- bar - bar

Fuel Rate

- mpg - miles per gallon
- km/l - kilometers per liter

Acceleration

- cm/s/s - centimeters per second squared
- g - gravitational acceleration

Temperature

- f - Fahrenheit
- c - Celsius
