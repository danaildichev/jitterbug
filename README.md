# Jitter Bug

![Static Badge](https://img.shields.io/badge/version-1-blue)

Simulated page traffic and product sales for e-commerce

Do you want to:

-   create a sense of urgency on your landing pages?
-   make it look like people are actively interested in your products?
-   and have customized control over it
-   without spending time and money building a real data stream?

Then you should add some dynamic jitter to your web pages. You can decide how much and how often:

-   your "products sold" will rise
-   and your "page views" will fluctuate

The best part about Jitter Bug is that these updates look and feel organic. Its timers trigger these changes at different intervals. Jitter Bug can be configured with default or custom settings for one or more products on a page. Your "page views" will bounce between a high and low value while your "products sold" will gradually increase. The numbers displayed for "page views" will be updated in unison for all instances, while the numbers for "products sold" will be updated individually and at different times. Jitter Bug's settings allow you to decide where those numbers start, how much, and how often those values will be updated.

## Table of Contents

- [Live Demo](#live-demo)
- [Install](#install)
- [Usage](#usage)
	- [What JitterBug will do](#what-jitterbug-will-do)
- [API](#api)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

## Live Demo
[https://danaildichev.net/portfolio/tools-apps/jitter-bug](https://danaildichev.net/portfolio/tools-apps/jitter-bug)

## Install

1. Clone the `JS` or the `jQuery` folder from this repo
2. Instantiate an instance of the `JitterBug` JS class

See the demo file, `index.html` or refer to the [Usage](#usage) section for more details

## Usage

Set up your HTML:

```html
 <h2>Product 1</h2>
 <p class="lead"><span class="jitter-buy-count"></span> customers have bought this today!</p>
 <p><span class="jitter-page-view"></span> people are looking at this right now</p>

 <h2>Product 2</h2>
 <p class="lead"><span class="jitter-buy-count"></span> customers have bought this today!</p>
 <p><span class="jitter-page-view"></span> people are looking at this right now</p>

 <h2>Product 3</h2>
 <p class="lead"><span class="jitter-buy-count"></span> customers have bought this today!</p>
 <p><span class="jitter-page-view"></span> people are looking at this right now</p>

```

Set up your javascript:

```javascript
<script>

// get the HTML elements that show the Jitter counts
let jitterElements =
{
    "buys": document.getElementsByClassName('jitter-buy-count'),
    "views": document.getElementsByClassName('jitter-page-view')
};

// create a JitterBug with default settings
let JB = new JitterBug(jitterElements.buys, jitterElements.views, false, false);

// when the document has loaded
document.addEventListener("DOMContentLoaded", () => {

    // do the JitterBug
    JB.dance();

});
	
</script>
```

### What JitterBug will do

JitterBug will periodically update the inner text of the 'buy' and 'view' elements. It has default settings for:

- what value each count starts at
- how much and how often each buy count goes up individually
- how much and how often all view counts go up or down in unison

The time between updates changes every time an update is made. The amount of change for each metric is different at every interval as well. That's so that the "site traffic" appears organic. 

View counts will bounce back and forth (aka jitter) between a high and a low value. The jitter frequency is also bound to a high and low value.

Buy counts will rise by an amount that is bound to a high and low value. The jitter frequencies for buy counts are also bound to a high and low value.

Optionally, a `JitterBug` instance can be created with custom settings. For example you could pass in this JSON:

```javascript
let bounds =
{
	"buys":
	{
		"start": { "min": 10, "max": 5 },
		"range": { "min": 0, "max": 4 },
		"interval": { "min": 1000, "max": 2000 }
	},

	"views":
	{
		"start": { "min": 50, "max": 5 },
		"range": { "min": 0, "max": 3 },
		"interval": { "min": 1000, "max": 2000 }
	}
}
```

<details>

<summary>See the comments for that JSON</summary>

```javascript
/*
* OPTIONS
*
* Custom jitter boundaries.
* - All values are integers.
* - All values represent a range.
* - All ranges are bound to a minimum value.
* - All ranges are bound to an additional value more than the minimum.
* - All additional values are dynamically random integers between min and (min + max)
*
* - "start" and "range" values represent a count
* - "interval" values represent milliseconds
*
* */
let bounds =
{
	"buys":
	{
		"start":
		{
			"min": 10, // minimum starting amount of products sold
			"max": 5 // maximum additional starting amount of products sold
		},
		"range":
		{
			"min": 0, // minimum amount of change in products sold
			"max": 4 // maximum amount of additional change in  products sold
		},
		"interval":
		{
			"min": 1000, // minimum amount of milliseconds between jitter intervals
			"max": 2000 // maximum amount of additional milliseconds between jitter intervals
		}
	},

	"views":
	{
		"start":
		{
			"min": 50, // minimum starting amount of viewers
			"max": 5 // maximum additional starting amount of viewers
		},
		"range":
		{
			"min": 0, // minimum amount of + or - change in viewers
			"max": 3 // maximum amount of additional + or - change in  viewers
		},
		"interval":
		{
			"min": 1000, // minimum amount of milliseconds between jitter intervals
			"max": 2000 // maximum amount of additional milliseconds between jitter intervals
		}
	}
}
// end optional jitter values
// **************************
```

</details>

The "buys" will start at a number between 150 and 200. Each "buy" has an interval between 1 and 3 seconds. Upon each interval the "buy" count will increase between 4 and 16. The "views" will start at a number between 100 and 150. All "views" have an interval between 1 and 3 seconds. Upon each interval the "view" count will change by an amount between 0 and 10.

Then with your customized options you can create an instance of `JitterBug` with

```javascript
// create a JitterBug with custom boundary settings
let JB = new JitterBug(jitterElements.buys, jitterElements.views, bounds.buys, bounds.views);
```


## API

The `JitterBug` class is not intended to expose any functions or data

## Issues

Open an issue or hit me up.

## Contributing

PRs accepted.

## License

GPL-3.0
