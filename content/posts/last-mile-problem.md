---
title: "The Last-Mile Problem: Why Short Deliveries Can Be Expensive"
description: "An explainer on delivery density, failed attempts, lockers, dark stores, and route optimization — and why the shortest leg of a shipment is not necessarily the cheapest."
date: "2026-09-17T10:00:00"
tags: ["logistics", "last-mile", "e-commerce", "supply-chain", "delivery-operations"]
draft: false
---

A parcel's longest journey may be its easiest to organize. Between major hubs, shipments can share vehicles, schedules, and handling infrastructure. Near the destination, that consolidated flow breaks into individual deliveries: different streets, different building entrances, different customer schedules.

This is the **last-mile problem**. The term describes the final delivery leg, not a literal distance of one mile. Its difficulty comes from turning a shared transport operation into many separate handovers.

The useful question is not whether the last mile always consumes a particular percentage of shipping cost. That depends on the shipment, network, and accounting boundary. The more useful question is: **how much time and capacity does it take to complete one successful delivery?**

This article develops an operational explanation from Barefeed's existing logistics material. Numerical examples below are explicitly hypothetical, not industry benchmarks; no new external research was consulted for this edition.

## 1. Distance Is Only Part of the Bill

A delivery route involves more than driving. The driver loads parcels, reaches the service area, finds parking, locates the correct package, walks to an entrance, gains access, and records the handover. The vehicle then returns or continues to another assignment.

Some of these activities barely change when the driving distance falls. Moving a depot closer does not remove the time spent waiting for a lift or contacting a recipient.

| Activity | What creates cost? | What can improve it? |
|---|---|---|
| Depot preparation | Sorting, loading, dispatch time | Loading in delivery sequence |
| Travel to the service area | Time before the first delivery | Depot placement and route allocation |
| Travel between stops | Distance, congestion, road restrictions | Stop grouping and routing |
| Service at the stop | Parking, walking, access, handover | Access instructions and consolidated reception |
| Exceptions | Missing information, failed attempts, damage | Better data and recovery options |

A simplified route-level measure is:

```
Route cost per successful delivery
  = Total cost of the route / Number of successful deliveries
```

That is not the full cost of fulfilling an order. Warehousing, inventory, upstream transport, customer support, and returns may sit outside the route budget. Comparing providers requires consistent definitions of what is included.

### An illustrative density example

Suppose two routes each cost **Rp600,000**, including allocated labor and vehicle costs. If one completes 100 deliveries and the other completes 60, their route costs per successful delivery are:

| Hypothetical route | Successful deliveries | Cost per delivery (Rp) |
|---|---:|---:|
| A | 100 | 6,000 |
| B | 60 | 10,000 |

The example holds route cost constant to isolate the denominator. Real routes will also differ in distance, working time, vehicle requirements, and other expenses.

The lesson is not that every route should accept more parcels. Loading beyond safe capacity or promising impossible schedules can create overtime and failures. The goal is more **feasible, successful deliveries** from the resources deployed.

## 2. Density Has More Than One Meaning

Population density is not the same as delivery density. An apartment block may contain hundreds of households but offer difficult parking and slow access. A less crowded commercial area may allow many parcels to be delivered through a single receiving desk.

Three forms of density matter:

- **Geographic density:** how close the stops are to one another.
- **Handover density:** how many parcels can be completed at one stop.
- **Time compatibility:** whether nearby deliveries can share a practical service window.

E-commerce can scatter deliveries across residential addresses, but it can also concentrate demand in particular neighborhoods. It does not automatically destroy density. Outcomes depend on where orders arise, when they must arrive, and how customers receive them.

For an operator, total daily order volume is therefore an incomplete signal. Orders concentrated in one service area may support an efficient route; the same number spread across a wider territory may not.

## 3. Failed Attempts Consume Capacity Without Completing the Job

A failed delivery still consumes work. Travel, parking, package handling, and contact attempts have already happened even if no handover occurs.

What happens next determines the additional cost. The parcel might be delivered to an authorized reception desk, redirected to a collection point, attempted again on a later route, or returned to the sender. A second attempt does **not necessarily double** total delivery cost: it may share a route already serving the area. It still requires additional capacity and handling.

Useful interventions target the cause of failure:

| Failure cause | Possible intervention | Important limit |
|---|---|---|
| Address cannot be located | Address validation and customer correction | A map pin alone may not identify the entrance |
| Recipient unavailable | Notifications and rescheduling | An estimate is not a guaranteed appointment |
| Building inaccessible | Entrance, reception, and access instructions | Sensitive access information needs protection |
| Home handover unsuitable | Authorized safe place or pickup alternative | Security and shipment restrictions still apply |

A delivery system should distinguish **attempted**, **delivered**, **ready for collection**, and **returned**. Treating all of them as “completed” hides operational problems behind a reassuring dashboard.

## 4. Lockers and Pickup Shops Consolidate Handovers

Parcel lockers and pickup/drop-off points, often abbreviated **PUDO**, replace multiple household visits with delivery to shared locations. Their economic appeal is straightforward: several parcels can reach their receiving point during one carrier stop.

But consolidation is not free. Lockers require space, equipment, maintenance, and enough available compartments. Pickup shops need staff and storage. Customers must complete the final collection journey.

Nor do these models eliminate failures. A locker can be full, a parcel oversized, a shop closed, or a collection deadline missed. For reporting purposes, carrier delivery to a locker should be distinguished from collection by the customer.

The model works best when consolidation savings outweigh the infrastructure and handling costs, and customers find collection convenient. A pickup point near an existing commute is a different proposition from one requiring a separate car trip. That distinction also matters when evaluating environmental benefits.

## 5. Route Optimization Needs a Realistic Model

The **Vehicle Routing Problem (VRP)** concerns assigning stops to vehicles and choosing their visiting order. Operational versions include capacity limits, delivery windows, driver breaks, access restrictions, and expected service times.

The general problem is computationally difficult, so practical systems often seek good feasible solutions within a time budget rather than a proven optimum. That does not mean simple heuristics are useless; they can be useful components of a solver or a baseline for comparison.

The objective matters as much as the algorithm. The shortest route may miss a promised window. A route with slightly more distance may reduce overtime or improve the chance of successful handovers.

Three requirements follow:

1. **Model stop time, not just driving time.** Parking and building access can change which sequence is feasible.
2. **Correct the input data.** An inaccurate address or service-time estimate can undermine an otherwise sound plan.
3. **Use feedback without creating constant disruption.** Replanning can help after a major delay, but repeated changes can conflict with vehicle loading order and confuse drivers.

Tracking supports these decisions. Its value comes from actionable information, not from choosing the highest possible update frequency.

## 6. Dark Stores Trade Proximity Against Inventory and Facility Costs

A **dark store** is a fulfillment location serving online orders rather than walk-in shopping. Placing one near customers can shorten delivery journeys. However, proximity does not guarantee enough orders to use its staff and inventory efficiently.

A network of small sites can introduce duplicated stock, replenishment work, rent, and waste for perishable goods. Very short delivery promises can also limit how long orders may wait to be grouped together.

The correct comparison is total fulfillment cost, not just the courier's distance:

```
Fulfillment cost per order includes:
  Picking and packing
  + Allocated facility costs
  + Inventory carrying costs and waste
  + Delivery
  + Exceptions and returns
```

A shorter route can coexist with a more expensive overall operation. That is the central trade-off, rather than a universal claim that dark stores are efficient or inefficient.

## 7. Match the Operating Model to the Promise

Different arrangements solve different problems. None is automatically cheapest in every market.

| Arrangement | Potential advantage | Main constraint |
|---|---|---|
| Shared parcel carrier | Consolidates demand across merchants | Coverage, cutoffs, and service terms |
| Dedicated fleet | More control over handling and schedules | Utilization and fixed commitments |
| On-demand couriers | Flexible capacity without owning every vehicle | Availability, pricing, and consistency |
| Locker or pickup network | Consolidates carrier handovers | Utilization and customer access |
| Store-based fulfillment | Uses inventory already near customers | Stock accuracy and competing store work |
| Dark-store network | Local fulfillment designed for online orders | Facility and inventory economics |

Same-day delivery does not inherently require a dark store; a retailer may dispatch from an existing shop. Flexible couriers do not eliminate delivery costs; some costs move into service prices and contractual arrangements.

The customer promise should follow the operating model's actual capabilities, not the other way around.

## 8. Measure the Outcome, Including the Return Journey

Cost per successful delivery is useful, but insufficient on its own. An operator could lower costs by missing commitments or shifting inconvenience onto customers.

A balanced view includes:

- **First-attempt success:** successful first attempts divided by all first attempts.
- **On-time delivery:** deliveries completed within the promised service window.
- **Parcels per stop and service time:** whether consolidation produces real productivity gains.
- **Exception cost:** reattempts, support contacts, storage, and return-to-sender handling.
- **Customer collection and complaint outcomes:** whether the chosen model works beyond the carrier scan.

Returns deserve explicit design too. Collection, inspection, sorting, and reintegration into stock add work after the original delivery. Return rates differ across products and policies; a single percentage should not stand in for every retailer's operation.

## Synthesis: Optimize the Handover, Not Just the Journey

The last-mile problem is a coordination problem involving geography, labor, access, information, and customer expectations. Vehicle efficiency and route optimization help, but neither removes a locked entrance or creates demand where there are too few orders.

The strongest operating questions are concrete: Can nearby orders share a route? Can several parcels share one handover? Can an avoidable failure be prevented before dispatch? Does a faster promise produce enough value to justify its cost?

**A short journey is not necessarily a cheap delivery. The meaningful unit is the successful handover — and the resources required to achieve it.**

## Sources and Editorial Scope

This explainer draws on themes in the following existing Barefeed articles, consulted as local Markdown copies:

- [What FedEx Teaches Us About Building Systems That Scale](/posts/what-fedex-teaches-us/) — network organization and the shift toward residential delivery.
- [Why Freight Giants Don't Run on Generic ERPs](/posts/logistics-software-stack/) — transport planning, visibility, and operational data.

These are background articles, not independent validation of industry statistics. The present article uses operational reasoning and a labeled hypothetical calculation; it makes no claim to a universal last-mile cost share, failure rate, or technology savings benchmark.

---

*Written with Nyeker — AI assistant, for Faqih (dibotak). Bot disclaimer: this article was written with AI assistance.*
