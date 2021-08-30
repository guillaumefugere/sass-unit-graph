# Sass Unit Graph
**Responsive CSS unit without the use of media queries.**

> :warning: Usage of [Dart Sass](https://github.com/sass/dart-sass) is mandatory.

```scss
@use "sass-unit-graph/unit" as unit;

:root {
  --font-size-base: #{unit.graph(
    (320px,16px), 
    (1920px,24px)
  )};
}

body {
  // font size of 16px at viewport width of 320px
  // font size of 18.24px at viewport width of 768px
  // font size of 24px at viewport width of 1920px
  font-size: var(--font-size-base);
}
```

## Quick install

### NPM

```bash
npm i sass sass-unit-graph
```

### Using within Sass

```scss
@use "sass-unit-graph/unit" as unit;
```

## Browser support

All browsers with support for CSS [calc()](https://caniuse.com/#search=calc), 
[min()](https://caniuse.com/#search=min()), [max()](https://caniuse.com/#search=max()) 
and [vw](https://caniuse.com/#search=vw) are supported, which includes:

* Edge (79+)
* Chrome (79+)
* Firefox (75+)
* Safari (11.1+)
* Android Browser (92+)

## Test

All tests are done in browser from a 
[test page](https://htmlpreview.github.io/?https://github.com/guillaumefugere/sass-unit-graph/blob/main/test/index.html) 
within the `test` folder.

## Usage

The `unit.graph()` Sass function returns an expression based 
on at least two points.

It is possible to use any CSS calc operations.

```scss
@use "sass-unit-graph/unit" as unit;

:root {
  --custom-prop: #{unit.graph(
    (320px,16px), 
    (1920px,24px)
  )};
}

// Multiplication
font-size: calc(var(--custom-prop) * 2);
// Division
font-size: calc(var(--custom-prop) / 2);
// Addition
font-size: calc(var(--custom-prop) + 10%);
// Subtraction
font-size: calc(var(--custom-prop) - 10%);
```

It is also possible to add or subtract multiple graph expressions:

```scss
@use "sass-unit-graph/unit" as unit;

:root {
  --custom-prop-1: #{unit.graph(
    (320px,16px),
    (1920px,24px)
  )};

  --custom-prop-2: #{unit.graph(
    (320px,8px),
    (1920px,12px)
  )};
}

body {
  font-size: calc(var(--custom-prop-1) + var(--custom-prop-2));
}
```

### Extrapolation

Extrapolation will appen below the first points X value, 
and above the last point X value.

```scss
unit.graph(
  // Extrapolation
  (320px,16px), 
  // Value is linear between two points
  (1920px,24px)
  // Extrapolation
)
```

It is possible to draw an horizontal line to get 
a constant Y value.

```scss
unit.graph(
  // Extrapolation
  (0px,    16px),
  // Fixed value of 16px until 320px
  (320px,  16px), 
  // Value is linear between two points
  (1920px, 24px), 
  // Fixed value of 24px above 1920px
  (2000px, 24px)
  // Extrapolation
)
```

### Steps

Creation of steps is possible by creating sharp ascending line.

```scss
unit.graph(
  // Extrapolation
  (0px,      16px),
  // Fixed value of 16px until ~768px
  (767.99px, 16px), 
  // Very sharp ascending line, user won't notice
  (768px,    24px), 
  // Fixed value of 24px above 768px
  (1920px,   24px)
  // Extrapolation
)
```

### Optimisation

In case of repeatition, usage of CSS custom properties is strongly  
encouraged since complexe expressions might be quite long.

## Known issues and limitations

### Precision

Although very good, the 
[precision of float numbers will be limited by Dart Sass compiler](https://sass-lang.com/documentation/values/numbers#precision), 
which affects the precision of the generated expressions.

### Units

`unit.graph()` accepts all absolute CSS units (cm, mm, in, px, pt, pc), 
although the output will always be in pixels.

This is made possible by Sass's support of real-world unit calculations, as detailed in the
[Sass documentation of numeric units](https://sass-lang.com/documentation/operators/numeric#units).

### `@use "sass-unit-graph/unit"` can't find the file

Configure Dart Sass [includePaths](https://github.com/sass/node-sass#includepaths)
option to resolve to your `node_modules` folder.

## Credit

Based on my previous work [sass-linear-expression](https://github.com/sigmundftw/sass-linear-expression), which is own by [Sigmund](https://github.com/sigmundftw).

Special thanks to my front-end collegues who inspired me to create better tooling.
