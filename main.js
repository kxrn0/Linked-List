function create_list() {
    const list = {
        head: null
    };

    function create_node(value) {
        return {value, next: null};
    }
    
    function append(value) {
        const node = create_node(value);

        if (list.head === null) {
            list.head = node;
            return;
        }

        let currentHead, added;

        currentHead = list.head;
        added = false;

        do {
            if (currentHead.next === null) {
                currentHead.next = node;
                added = true;
            }
            else
                currentHead = currentHead.next;
        } while (!added);
    }

    function prepend(value) {
        const node = create_node(value);

        if (list.head === null) {
            list.head = node;
            return;
        }

        const tempHead = list.head;
        node.next = tempHead;
        list.head = node;
    }

    function size() {
        let count, currentNode;

        count = 0;
        currentNode = list.head;
        while (currentNode) {
            count++;
            currentNode = currentNode.next;
        } 
        return count;
    }

    function tail() {
        let currentNode;

        currentNode = list.head;

        if (currentNode === null)
            return null;
        
        do {
            if (currentNode.next === null)
                return currentNode;
            else
                currentNode = currentNode.next;
        } while (currentNode);
    }

    function _at_index(index, node) {
        if (node === null)
            return null;

        if (index === 0)
            return node.value;

        return _at_index(index - 1, node.next);
    }

    function at(index) {
        return _at_index(index, list.head);
    }

    function pop() {
        if (size() <= 1) {
            list.head = null;
            return;
        }

        let parent, child, done;

        parent = list.head;
        child = parent.next;
        done = false;

        do {
            if (child.next === null) {
                parent.next = null;
                done = true;
            }
            else {
                const temp = child;

                child = child.next;
                parent = temp;
            }
        } while (!done);
    }

    function contains(value) {
        if (list.head === null)
            return false;
        
        let currentNode = list.head;

        do {
            if (currentNode.value == value)
                return true;
            else
                currentNode = currentNode.next;
        } while (currentNode);
        return false;
    }
    
    function find(value) {
        if (list.head === null)
            return -1;

        let index, currentNode;

        index = 0;
        currentNode = list.head;

        do {
            if (currentNode.value === value)
                return index;
            else {
                currentNode = currentNode.next;
                index++;
            }
        } while (currentNode);
        return -1;
    }

    function toString() {
        if (list.head === null)
            return "null";

        let currentNode, str;

        currentNode = list.head;
        str = '';

        do {
            str += `( ${JSON.stringify(currentNode.value)} ) ${currentNode.next ? "-> " : ''}`;
            currentNode = currentNode.next;
        } while (currentNode);
        return `${str}-> null`;
    }

    function insert_at(value, index) {
        if (size() < index || index < 0)
            throw new Error("index out of bounds");

        const node = create_node(value);

        if (index === 0) {
            node.next = list.head;
            list.head = node;
            return;
        }

        let parent, child, currentIndex, done;

        parent = list.head;
        child = parent.next;
        currentIndex = 1;
        done = false;
        
        do {
            if (currentIndex === index) {
                parent.next = node;
                node.next = child;
                done = true;
            }
            else {
                const temp = child;
                
                child = child.next;
                parent = temp;
                currentIndex++;
            }
        } while(!done);
    }

    function remove_at(index) {
        if (size() <= index || index < 0)
            throw new Error("index out of bounds!");
        
        if (index === 0) {
            if (list.head !== null)
                list.head = list.head.next;
            return;
        }

        if (index === size() - 1) {
            pop();
            return;
        }
        
        let parent, child, currentIndex, done;

        parent = list.head;
        child = parent.next;
        currentIndex = 1;
        done = false;

        do {
            if (currentIndex === index) {
                parent.next = child.next;
                done = true;
            }
            else {
                const temp = child;

                child = child.next;
                parent = temp;
                currentIndex++;
            }
        } while (!done);
    }
    
    return Object.assign(list, {append, prepend, size, tail, at, pop, contains, find, toString, insert_at, remove_at});
}

module.exports = create_list;