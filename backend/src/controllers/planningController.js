const CalendarEngine = require('../services/calendarEngine');
const BusinessProfile = require('../models/BusinessProfile');

// @desc    Get monthly planning calendar
// @route   GET /api/planning/calendar
// @access  Private
exports.getMonthlyCalendar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { year, month } = req.query;
    
    const currentDate = new Date();
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth();
    
    // Validate month (0-11)
    if (targetMonth < 0 || targetMonth > 11) {
      return res.status(400).json({
        success: false,
        message: 'Invalid month. Must be between 0-11'
      });
    }
    
    // Get business profile for personalization
    const profile = await BusinessProfile.findOne({ userId });
    
    // Generate calendar events
    const events = CalendarEngine.generateMonthlyCalendar(targetYear, targetMonth);
    
    // Get best offer days for the month
    const bestOfferDays = CalendarEngine.getBestOfferDays(targetYear, targetMonth);
    
    // Group events by type
    const eventsByType = {
      festival: events.filter(e => e.type === 'festival'),
      salary: events.filter(e => e.type === 'salary'),
      market: events.filter(e => e.type === 'market')
    };
    
    res.json({
      success: true,
      data: {
        year: targetYear,
        month: targetMonth,
        monthName: new Date(targetYear, targetMonth).toLocaleString('default', { month: 'long' }),
        events,
        eventsByType,
        bestOfferDays,
        profile: {
          shopName: profile?.shopName || 'Your Shop',
          vendorType: profile?.vendorType || 'kirana'
        },
        summary: {
          totalEvents: events.length,
          festivalDays: eventsByType.festival.length,
          salaryDays: eventsByType.salary.length,
          marketDays: eventsByType.market.length,
          bestOfferDays: bestOfferDays.length
        }
      }
    });
    
  } catch (error) {
    console.error('Monthly calendar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get monthly calendar',
      error: error.message
    });
  }
};

// @desc    Get events for specific date
// @route   GET /api/planning/date/:date
// @access  Private
exports.getEventsForDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }
    
    const events = CalendarEngine.getEventsForDate(date);
    
    // Generate AI suggestions for the date
    const suggestions = this.generateDateSuggestions(date, events);
    
    res.json({
      success: true,
      data: {
        date,
        events,
        suggestions,
        eventCount: events.length
      }
    });
    
  } catch (error) {
    console.error('Date events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get events for date',
      error: error.message
    });
  }
};

// @desc    Get offer planning suggestions
// @route   GET /api/planning/offers
// @access  Private
exports.getOfferSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;
    
    const currentDate = new Date();
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth();
    
    // Get business profile
    const profile = await BusinessProfile.findOne({ userId });
    
    // Get best offer days
    const bestOfferDays = CalendarEngine.getBestOfferDays(targetYear, targetMonth);
    
    // Generate detailed offer suggestions
    const offerSuggestions = bestOfferDays.map(day => {
      const events = CalendarEngine.getEventsForDate(day.date);
      return {
        ...day,
        events,
        detailedSuggestion: this.generateOfferSuggestion(day, events, profile?.vendorType),
        discountRange: this.getRecommendedDiscountRange(events),
        targetProducts: this.getTargetProducts(events, profile?.vendorType)
      };
    });
    
    res.json({
      success: true,
      data: {
        month: targetMonth,
        year: targetYear,
        offerSuggestions,
        totalOpportunities: offerSuggestions.length,
        profile: {
          shopName: profile?.shopName || 'Your Shop',
          vendorType: profile?.vendorType || 'kirana'
        }
      }
    });
    
  } catch (error) {
    console.error('Offer suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get offer suggestions',
      error: error.message
    });
  }
};

// @desc    Get seasonal planning advice
// @route   GET /api/planning/seasonal
// @access  Private
exports.getSeasonalAdvice = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    
    // Get business profile
    const profile = await BusinessProfile.findOne({ userId });
    
    // Generate seasonal advice
    const seasonalAdvice = this.generateSeasonalAdvice(currentMonth, profile?.vendorType);
    
    // Get upcoming seasonal events (next 3 months)
    const upcomingEvents = [];
    for (let i = 0; i < 3; i++) {
      const month = (currentMonth + i) % 12;
      const year = currentMonth + i >= 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
      const monthEvents = CalendarEngine.generateMonthlyCalendar(year, month);
      upcomingEvents.push(...monthEvents.filter(e => e.type === 'festival'));
    }
    
    res.json({
      success: true,
      data: {
        currentMonth,
        seasonalAdvice,
        upcomingEvents: upcomingEvents.slice(0, 5), // Next 5 festivals
        profile: {
          shopName: profile?.shopName || 'Your Shop',
          vendorType: profile?.vendorType || 'kirana'
        }
      }
    });
    
  } catch (error) {
    console.error('Seasonal advice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get seasonal advice',
      error: error.message
    });
  }
};

// Helper functions
exports.generateDateSuggestions = (date, events) => {
  if (events.length === 0) {
    return ['Regular day. Focus on maintaining good customer service and stock organization.'];
  }
  
  const suggestions = [];
  
  events.forEach(event => {
    switch (event.type) {
      case 'festival':
        suggestions.push(`Festival day! ${event.suggestion}`);
        suggestions.push('Decorate your shop with festive items to attract customers.');
        break;
      case 'salary':
        suggestions.push(`Salary day advantage! ${event.suggestion}`);
        suggestions.push('Consider promoting premium products with attractive offers.');
        break;
      case 'market':
        suggestions.push(`Weekend market day! ${event.suggestion}`);
        suggestions.push('Ensure adequate stock and consider extended hours.');
        break;
    }
  });
  
  return suggestions;
};

exports.generateOfferSuggestion = (day, events, vendorType = 'kirana') => {
  const event = events[0]; // Primary event
  
  const suggestions = {
    festival: {
      kirana: 'Create festival combo packs with sweets, snacks, and decorative items. Offer 10-20% discount on bulk purchases.',
      clothing: 'Launch festive collection with traditional wear. Offer buy-2-get-1 deals on festival outfits.',
      rural: 'Stock festival essentials like oil, rice, and sweets. Offer family packs at discounted rates.'
    },
    salary: {
      kirana: 'Promote monthly essentials bundle. Offer 5-15% discount on household items and groceries.',
      clothing: 'Launch premium collection targeting salary earners. Offer EMI options for expensive items.',
      rural: 'Focus on agricultural supplies and household needs. Offer bulk discounts for farmers.'
    },
    market: {
      kirana: 'Weekend family packs and ready-to-eat items. Offer buy-2-get-1 on snacks and beverages.',
      clothing: 'Weekend shopping deals for families. Offer discounts on children and women\'s wear.',
      rural: 'Market day specials on daily essentials. Offer transportation discounts for bulk buyers.'
    }
  };
  
  return suggestions[event?.type]?.[vendorType] || 'Create attractive offers based on the day\'s significance.';
};

exports.getRecommendedDiscountRange = (events) => {
  if (events.some(e => e.type === 'festival' && e.impact === 'high')) {
    return '15-25%';
  } else if (events.some(e => e.type === 'salary')) {
    return '10-20%';
  } else if (events.some(e => e.type === 'market')) {
    return '5-15%';
  }
  return '5-10%';
};

exports.getTargetProducts = (events, vendorType = 'kirana') => {
  const productSuggestions = {
    festival: {
      kirana: ['Sweets', 'Snacks', 'Decorative items', 'Gift packs', 'Traditional foods'],
      clothing: ['Festive wear', 'Traditional outfits', 'Accessories', 'Footwear', 'Jewelry'],
      rural: ['Festival essentials', 'Cooking oil', 'Rice', 'Sweets', 'Decorations']
    },
    salary: {
      kirana: ['Monthly groceries', 'Household items', 'Personal care', 'Cleaning supplies', 'Bulk items'],
      clothing: ['Premium wear', 'Branded items', 'Seasonal collection', 'Accessories', 'Footwear'],
      rural: ['Agricultural supplies', 'Tools', 'Seeds', 'Fertilizers', 'Household needs']
    },
    market: {
      kirana: ['Ready-to-eat', 'Beverages', 'Snacks', 'Family packs', 'Fresh items'],
      clothing: ['Casual wear', 'Children\'s clothes', 'Women\'s wear', 'Seasonal items', 'Accessories'],
      rural: ['Daily essentials', 'Fresh produce', 'Basic clothing', 'Tools', 'Household items']
    }
  };
  
  const primaryEvent = events[0];
  return productSuggestions[primaryEvent?.type]?.[vendorType] || ['General items', 'Popular products', 'Seasonal items'];
};

exports.generateSeasonalAdvice = (month, vendorType = 'kirana') => {
  const seasonalAdvice = {
    // Winter months (Dec, Jan, Feb)
    winter: {
      kirana: 'Winter season: Stock warm beverages, comfort foods, and seasonal fruits. Promote hot snacks and winter essentials.',
      clothing: 'Winter collection: Focus on warm clothing, jackets, sweaters, and winter accessories. Clear summer stock.',
      rural: 'Winter farming: Stock seeds for winter crops, warm clothing, and heating essentials for rural customers.'
    },
    // Spring months (Mar, Apr, May)
    spring: {
      kirana: 'Spring season: Fresh fruits and vegetables in demand. Stock cooling items as weather warms up.',
      clothing: 'Spring collection: Light fabrics, bright colors, and transitional wear. Prepare for summer collection.',
      rural: 'Spring farming: High demand for seeds, fertilizers, and farming tools. Stock irrigation supplies.'
    },
    // Summer months (Jun, Jul, Aug)
    summer: {
      kirana: 'Summer season: Cold drinks, ice cream, and cooling products are essential. Stock summer fruits prominently.',
      clothing: 'Summer collection: Light, breathable fabrics, cotton wear, and summer accessories. Focus on comfort.',
      rural: 'Summer needs: Cooling products, summer clothing, and agricultural supplies for summer crops.'
    },
    // Monsoon months (Sep, Oct, Nov)
    monsoon: {
      kirana: 'Monsoon season: Stock umbrellas, raincoats, and indoor snacks. Promote hot beverages and comfort foods.',
      clothing: 'Monsoon wear: Waterproof items, quick-dry fabrics, and monsoon accessories. Protect inventory from moisture.',
      rural: 'Monsoon preparation: Rainwear, waterproof storage, and monsoon-resistant products for rural areas.'
    }
  };
  
  let season;
  if ([11, 0, 1].includes(month)) season = 'winter';
  else if ([2, 3, 4].includes(month)) season = 'spring';
  else if ([5, 6, 7].includes(month)) season = 'summer';
  else season = 'monsoon';
  
  return seasonalAdvice[season][vendorType];
};

// Route-expected methods
// @desc    Get planning calendar
// @route   GET /api/planning/calendar
// @access  Private
exports.getPlanningCalendar = exports.getMonthlyCalendar;

// @desc    Get offer recommendations
// @route   GET /api/planning/recommendations
// @access  Private
exports.getOfferRecommendations = exports.getOfferSuggestions;

// @desc    Lock a plan for future use
// @route   POST /api/planning/lock
// @access  Private
exports.lockPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planName, planData, scheduledDate } = req.body;
    
    if (!planName || !planData) {
      return res.status(400).json({
        success: false,
        message: 'Plan name and data are required'
      });
    }
    
    // For now, we'll store in business profile as locked plans
    const profile = await BusinessProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Business profile not found'
      });
    }
    
    if (!profile.lockedPlans) {
      profile.lockedPlans = [];
    }
    
    const newPlan = {
      id: Date.now().toString(),
      name: planName,
      data: planData,
      scheduledDate,
      createdAt: new Date(),
      isActive: true
    };
    
    profile.lockedPlans.push(newPlan);
    await profile.save();
    
    res.json({
      success: true,
      message: 'Plan locked successfully',
      plan: newPlan
    });
    
  } catch (error) {
    console.error('Lock plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to lock plan',
      error: error.message
    });
  }
};

// @desc    Get locked plans
// @route   GET /api/planning/locked
// @access  Private
exports.getLockedPlans = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await BusinessProfile.findOne({ userId });
    const lockedPlans = profile?.lockedPlans?.filter(plan => plan.isActive) || [];
    
    res.json({
      success: true,
      plans: lockedPlans
    });
    
  } catch (error) {
    console.error('Get locked plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get locked plans',
      error: error.message
    });
  }
};

// @desc    Delete locked plan
// @route   DELETE /api/planning/locked/:id
// @access  Private
exports.deleteLockedPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const profile = await BusinessProfile.findOne({ userId });
    if (!profile || !profile.lockedPlans) {
      return res.status(404).json({
        success: false,
        message: 'No locked plans found'
      });
    }
    
    const planIndex = profile.lockedPlans.findIndex(plan => plan.id === id);
    if (planIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    profile.lockedPlans[planIndex].isActive = false;
    await profile.save();
    
    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete locked plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete plan',
      error: error.message
    });
  }
};