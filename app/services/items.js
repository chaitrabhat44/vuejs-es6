import { api } from './base';
import { EventEmitter } from 'events';

const items = api.all('items');
const itemHandler = new EventEmitter();
export default itemHandler;

itemHandler.bulkDelete = (itemsToDelete) => {
    return new Promise((resolve, reject) => {
        if (itemsToDelete.length > 0) {
            itemsToDelete.forEach(i => {
                items.delete(i._id);
            });

            resolve();
        } else
            resolve();
    });
}

itemHandler.getAll = () => { 
    return new Promise((resolve, reject) => {
        items.getAll()
            .then(response => {
                const entities = response.body();
                var i = [];

                entities.forEach(entity => {
                    i.push(entity.data());
                });

                resolve(i);
            }, response => {
                reject('Error fetching items');
            });
    });
}

itemHandler.save = text => {
    return new Promise((resolve, reject) => {
        items.post({ content: text, checked: false })
            .then(response => {
                var newItem = response.body().data();
                itemHandler.emit('update');
                resolve(itemHandler.items);
            }, response => {
                reject('Error saving new item');
            });
    });
}

itemHandler.update = item => {
    return new Promise((resolve, reject) => {
        items.put(item._id, item)
            .then(response => {
                resolve();
            }, response => {
                reject('Unable to save item');
            });
    });
}
