// =========
// JitterBug

class JitterBug
{
    /*****************
     * fn: constructor
     * builds a new JitterBug
     *
     * @param buys {jitterElements} - elements selected with jQuery. Displays number of products sold
     * @param views {jitterElements} - elements selected with jQuery. Displays number of page viewers
     * @param buyBounds {object} - custom boundaries for buy elements
     * @param viewBounds {object} - custom boundaries for view elements
     *
     * @returns {object} - a new JitterBug
     *
     * */
    constructor
    (
        buys,
        views,
        buyBounds,
        viewBounds
    ){
        // --------------------------------
        // set elements for displaying buys
        this.buys = buys;

        // ---------------------------------
        // set elements for displaying views
        this.views = views;

        // ---------------------------------------------------------------------
        // if using custom buy bounds, set custom buy bounds to each buy element
        // else set default buy bounds
        if (buyBounds)
        {
            for (let i = 0; i < this.buys.length; i++)
            {
                this.buys[i].bounds = this.setCustomBuyBounds(buyBounds);
            }
        }
        else
        {
            for (let i = 0; i < this.buys.length; i++)
            {
                this.buys[i].bounds = this.getDefaultBuyBounds();
            }
        }

        // --------------------------------------------------------------------
        // if using custom view bounds, set custom view bounds to view elements
        // else set default view bounds
        if (viewBounds) { this.viewBounds = this.setCustomViewBounds(viewBounds); }
        else { this.viewBounds = this.getDefaultViewBounds(); }

    }
    // end constructor
    // ***************


    /**************************
     * fn: getRandomFromRange()
     * generate a random number from a given range
     *
     * @param min {int} - the minimum value in the range
     * @param max {int} - the maximum value that could be added to min
     *
     * @returns {int}
     * */
    getRandomFromRange(min, max)
    {
        return Math.round(min + (Math.random() * max));
    }
    // end fn: getRandomFromRange()
    // ****************************


    /***************************
     * fn: getDefaultBuyBounds()
     *
     * @returns {object} The default jitter boundaries for buy counts
     *
     * */
    getDefaultBuyBounds()
    {
        return {
            "start": this.getRandomFromRange(60, 40),
            "range":
                {
                    "min": 0,
                    "max": 2,
                },
            "interval":
                {
                    "min": 58000,
                    "max": 3000,
                },
        };
    }
    // end fn: getDefaultBuyBounds()
    // ******************************


    /**************************
     * fn: setCustomBuyBounds()
     *
     * @param bounds {object} the boundaries of the buy counts
     *
     * @returns {object}
     *
     * */
    setCustomBuyBounds(bounds)
    {
        return {
            "start": this.getRandomFromRange(bounds.start.min, bounds.start.max),
            "range": bounds.range,
            "interval": bounds.interval
        };
    }
    // end fn: setCustomBuyBounds()
    // ****************************


    /****************************
     * fn: getDefaultViewBounds()
     *
     * @returns {object} The default jitter boundaries for view counts
     *
     * */
    getDefaultViewBounds()
    {
        return {
            "start": this.getRandomFromRange(45, 10),
            "range":
                {
                    "min": 0,
                    "max": 5,
                },
            "interval":
                {
                    "min": 5000,
                    "max": 3000,
                },
        };
    }
    // end fn: getDefaultViewBounds()
    // ******************************


    /***************************
     * fn: setCustomViewBounds()
     *
     * @param bounds {object} - the boundaries of the view counts
     *
     * @returns {object}
     *
     * */
    setCustomViewBounds(bounds)
    {
        return {
            "start": this.getRandomFromRange(bounds.start.min, bounds.start.max),
            "range": bounds.range,
            "interval": bounds.interval
        };
    }
    // end fn: setCustomViewBounds()
    // *****************************


    /**
     * fn: getRandomViewsInterval()
     *
     * @returns {int} - a number of milliseconds within the views interval
     *
     * */
    getRandomViewsInterval()
    {
        return this.getRandomFromRange(this.viewBounds.interval.min, this.viewBounds.interval.max);
    }
    // end fn: getRandomViewsInterval()
    // ********************************


    /**
     * fn: getRandomViewCount()
     *
     * @returns {int} - a random number with the views range
     *
     * */
    getRandomViewsCount()
    {
        return this.getRandomFromRange(this.viewBounds.range.min, this.viewBounds.range.max);
    }
    // end fn: getRandomViewCount()
    // ****************************
    
    
    /****************
     * fn: initBuys()
     *
     * set starting values to each buy element
     * 
     * */
    initBuys()
    {
        for (let i = 0; i < this.buys.length; i++)
        {
            this.buys[i].innerText = this.buys[i].bounds.start;
        }
    }
    // end fn: initBuys()
    // ******************


    /*****************
     * fn: initViews()
     *
     * set starting value to all view elements
     *
     * */
    initViews()
    {
        for (let v of this.views)
        {
            v.innerText = this.viewBounds.start;
        }
    }
    // end fn: initViews()
    // *******************
    
    
    /***********************
     * fn: updateBuyCounts()
     * 
     * periodically update the number of purchases for each buy element 
     * 
     * */
    updateBuyCounts()
    {
        for (let b of this.buys)
        {
            let increase = this.getRandomFromRange(b.bounds.range.min, b.bounds.range.max);
            setInterval(function ()
            {
                let newBuyCount = b.bounds.start + increase;
                b.innerText = newBuyCount;
                b.bounds.start = newBuyCount;

            }, this.getRandomFromRange(b.bounds.interval.min, b.bounds.interval.max))
        }

    }
    // end fn: updateBuyCounts()
    // *************************


    /************************
     * fn: updateViewsCount()
     *
     * */
    updateViewsCount()
    {
        let viewsInterval = this.getRandomViewsInterval();
        let that = this;
        setInterval(function ()
        {
            // get a new view count
            let nextViewCount = that.getRandomViewsCount();

            // randomly decide if views count should be increased or decreased
            let next = 0;
            if (Math.random() > 0.5) { next = that.viewBounds.start + nextViewCount; }
            else { next = that.viewBounds.start - nextViewCount; }

            // update view count displayed on the page
            that.views.text(next);

            // reset the amount of time until next views count update
            viewsInterval = that.getRandomViewsInterval();

        }, viewsInterval);

    }
    // end fn: updateViewsCount()
    // **************************


    /**
     * fn: dance()
     *
     * Run the JitterBug
     *
     * */
    dance()
    {
        // init buys count
        this.initBuys();

        // init views counts
        this.initViews();

        // periodically update buys count
        this.updateBuyCounts();

        // periodically update views count
        this.updateViewsCount();
    }
    // end fn: dance()
    // ***************

}

// end JitterBug
// =============