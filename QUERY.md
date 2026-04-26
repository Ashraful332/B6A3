# Sample SQL Queries - Expected Output

This document provides sample data and the expected outputs for the SQL queries defined in the assignment.

## Sample Data (Input)

### Users Table
| user_id | name | email | phone | role |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Alice | alice@example.com | 1234567890 | Customer |
| 2 | Bob | bob@example.com | 0987654321 | Admin |
| 3 | Charlie | charlie@example.com | 1122334455 | Customer |

### Vehicles Table
| vehicle_id | name | type | model | registration_number | rental_price | status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Toyota Corolla | car | 2022 | ABC-123 | 50 | available |
| 2 | Honda Civic | car | 2021 | DEF-456 | 60 | rented |
| 3 | Yamaha R15 | bike | 2023 | GHI-789 | 30 | available |
| 4 | Ford F-150 | truck | 2020 | JKL-012 | 100 | maintenance |

### Bookings Table
| booking_id | user_id | vehicle_id | start_date | end_date | status | total_cost |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 2 | 2023-10-01 | 2023-10-05 | completed | 240 |
| 2 | 1 | 2 | 2023-11-01 | 2023-11-03 | completed | 120 |
| 3 | 3 | 2 | 2023-12-01 | 2023-12-02 | confirmed | 60 |
| 4 | 1 | 1 | 2023-12-10 | 2023-12-12 | pending | 100 |

---

## Expected Query Results

### Query 1: JOIN
**Requirement**: Retrieve booking information along with Customer name and Vehicle name.

**Expected Output**:
| booking_id | customer_name | vehicle_name | start_date | end_date | status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Alice | Honda Civic | 2023-10-01 | 2023-10-05 | completed |
| 2 | Alice | Honda Civic | 2023-11-01 | 2023-11-03 | completed |
| 3 | Charlie | Honda Civic | 2023-12-01 | 2023-12-02 | confirmed |
| 4 | Alice | Toyota Corolla | 2023-12-10 | 2023-12-12 | pending |

---

### Query 2: EXISTS
**Requirement**: Find all vehicles that have never been booked.

**Expected Output**:
| vehicle_id | name | type | model | registration_number | rental_price | status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 3 | Yamaha R15 | bike | 2023 | GHI-789 | 30 | available |
| 4 | Ford F-150 | truck | 2020 | JKL-012 | 100 | maintenance |

---

### Query 3: WHERE
**Requirement**: Retrieve all available vehicles of a specific type (e.g. cars).

**Expected Output**:
| vehicle_id | name | type | model | registration_number | rental_price | status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Toyota Corolla | car | 2022 | ABC-123 | 50 | available |

---

### Query 4: GROUP BY and HAVING
**Requirement**: Find the total number of bookings for each vehicle and display only those vehicles that have more than 2 bookings.

**Expected Output**:
| vehicle_name | total_bookings |
| :--- | :--- |
| Honda Civic | 3 |
