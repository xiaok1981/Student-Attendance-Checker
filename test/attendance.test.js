const test = require("node:test");
const assert = require("node:assert");

const { calculateAttendance } = require("../script");

test("Test 1: 40 total, 36 attended -> 90%, Eligible", () => {
    const result = calculateAttendance(40, 36);
    assert.strictEqual(result.percentage, 90);
    assert.strictEqual(result.status, "Eligible");
});

test("Test 2: 40 total, 30 attended -> 75%, Eligible", () => {
    const result = calculateAttendance(40, 30);
    assert.strictEqual(result.percentage, 75);
    assert.strictEqual(result.status, "Eligible");
});

test("Test 3: 40 total, 28 attended -> 70%, Not Eligible", () => {
    const result = calculateAttendance(40, 28);
    assert.strictEqual(result.percentage, 70);
    assert.strictEqual(result.status, "Not Eligible");
});

test("Test 4: Invalid attendance data (attended > total)", () => {
    const result = calculateAttendance(40, 45);
    assert.strictEqual(result.status, "Invalid attendance data");
});

test("Test 5: Invalid attendance data (negative numbers, zero total, non-numeric)", () => {
    assert.strictEqual(calculateAttendance(-40, 20).status, "Invalid attendance data");
    assert.strictEqual(calculateAttendance(40, -10).status, "Invalid attendance data");
    assert.strictEqual(calculateAttendance(0, 0).status, "Invalid attendance data");
    assert.strictEqual(calculateAttendance("abc", 20).status, "Invalid attendance data");
    assert.strictEqual(calculateAttendance(40, "xyz").status, "Invalid attendance data");
    assert.strictEqual(calculateAttendance("", "").status, "Invalid attendance data");
});

test("Test 6: Boundary case 100% attendance (40 total, 40 attended -> 100%, Eligible)", () => {
    const result = calculateAttendance(40, 40);
    assert.strictEqual(result.percentage, 100);
    assert.strictEqual(result.status, "Eligible");
});

test("Test 7: Decimal percentage (40 total, 35 attended -> 87.5%, Eligible)", () => {
    const result = calculateAttendance(40, 35);
    assert.strictEqual(result.percentage, 87.5);
    assert.strictEqual(result.status, "Eligible");
});

console.log("All Attendance Checker tests passed!");
