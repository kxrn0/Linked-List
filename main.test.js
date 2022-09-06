const create_list = require("./main");

test("Create a list and append values", () => {
    const list = create_list();
    const expected = {
        value: 100,
        next: {
            value: 200,
            next: {
                value: 300,
                next: null
            }
        }
    };

    list.append(100);
    list.append(200);
    list.append(300);

    expect(list.head).toEqual(expected);
});

test("Create a list and prepend values", () => {
    const list = create_list();
    const expected = {
        value: 300,
        next: {
            value: 200,
            next: {
                value: 100,
                next: null
            }
        }
    };

    list.prepend(100);
    list.prepend(200);
    list.prepend(300);

    expect(list.head).toEqual(expected);
});

test("Give the correct size of a list", () => {
    const list = create_list();

    expect(list.size()).toBe(0);

    list.append(100);

    expect(list.size()).toBe(1);

    list.append(200);
    list.append(300);

    expect(list.size()).toBe(3);

});

test("Give the correct value for the tail of a list", () => {
    const list = create_list();

    expect(list.tail()).toBe(null);

    list.append(100);

    expect(list.tail().value).toBe(100);

    list.append(200);
    list.append(300);
    list.append(400);
    list.append(500);

    expect(list.tail().value).toBe(500);

});

test("Give the correct value for the value at an index", () => {
    const list = create_list();

    expect(list.at(0)).toBe(null);
    expect(list.at(1)).toBe(null);


    for (let i = 0; i < 10; i++)
        list.append(i * 100);

    expect(list.at(0)).toBe(0);
    expect(list.at(1)).toBe(100);
    expect(list.at(3)).toBe(300);
    expect(list.at(9)).toBe(900);
});

test("Show correct behaviour for pop", () => {
    const list = create_list();
    const expected = {
        value: 100,
        next: {
            value: 200,
            next: null
        }
    };

    list.pop();

    expect(list.head).toBe(null);

    for (let i = 0; i < 10; i++)
        list.append(i * 100);

    for (let i = 0; i < 10; i++)
        list.pop();

    expect(list.head).toBe(null);

    list.append(100);
    list.pop();

    expect(list.head).toBe(null);

    list.append(100);
    list.append(200);
    list.append(300);

    list.pop();

    expect(list.head).toEqual(expected);
});

test("Inquire about the contents of a list", () => {
    const list = create_list();

    expect(list.contains(100)).toBe(false);

    list.append(100);

    expect(list.contains(100)).toBe(true);
    expect(list.contains(200)).toBe(false);

    list.append(200);
    list.append(300);
    list.append(400);
    list.append(500);
    list.append(600);

    expect(list.contains(200)).toBe(true);
    expect(list.contains(300)).toBe(true);
    expect(list.contains(500)).toBe(true);
    expect(list.contains(1000)).toBe(false);
});

test("Search for the index of a value in a list", () => {
    const list = create_list();

    expect(list.find(100)).toBe(-1);
    
    list.append(100);

    expect(list.find(100)).toBe(0);

    list.append(200);
    list.append(300);

    expect(list.find(200)).toBe(1);
    expect(list.find(500)).toBe(-1);
});

test("Stringify a list", () => {
    const list = create_list();
    const empty = "null";
    const oneItem = "( 100 ) -> null";
    const moreItems = "( 100 ) -> ( 200 ) -> ( 300 ) -> null";

    expect(list.toString()).toBe(empty);

    list.append(100);

    expect(list.toString()).toBe(oneItem);

    list.append(200);
    list.append(300);

    expect(list.toString()).toBe(moreItems);
});

test("Inser value at a given position", () => {
    const list = create_list();
    const oneItem = "( 100 ) -> null";
    const moreItems = "( 100 ) -> ( 200 ) -> ( 300 ) -> ( 400 ) -> ( 500 ) -> null";

    list.insert_at(100, 0);

    expect(list.toString()).toBe(oneItem);

    list.append(200);
    list.append(400);
    list.append(500);

    list.insert_at(300, 2);

    expect(list.toString()).toBe(moreItems);
});

test("Remove items from a list", () => {
    const list = create_list();
    const firstForm = "( 200 ) -> null";
    const secondForm = "( 100 ) -> null";
    const finalForm = "( 100 ) -> ( 300 ) -> ( 400 ) -> ( 600 ) -> ( 900 ) -> null";

    list.append(100);
    
    list.remove_at(0);

    expect(list.head).toBe(null);

    list.append(100);
    list.append(200);

    list.remove_at(0);

    expect(list.toString()).toBe(firstForm);

    list.prepend(100);
    
    list.remove_at(1);

    expect(list.toString()).toBe(secondForm);

    list.remove_at(0);

    for (let i = 0; i < 10; i++)
        list.append(i * 100);

    list.remove_at(0);
    list.remove_at(1);
    list.remove_at(3);
    list.remove_at(4);
    list.remove_at(4);

    expect(list.toString()).toBe(finalForm);
});