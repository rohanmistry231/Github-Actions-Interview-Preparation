const { add, subtract } = require('./app.js');

describe('Math Functions', () => {
    test('should add two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('should subtract two numbers correctly', () => {
        expect(subtract(5, 3)).toBe(2);
    });
});