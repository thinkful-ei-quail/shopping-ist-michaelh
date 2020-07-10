"use strict";

const store = {
 items:[
  {id: cuid(),name: 'apples', checked: false},
  {id: cuid(),name: 'oranges', checked: false},
  {id: cuid(),name: 'milk', checked: true},
  {id: cuid(),name: 'bread', checked: false}
 ],
 hideCheckedItems: false,
 nextNameId: null,
 renaming: null,
};

const generateItemElement = function (item){
 let itemTitle, renameLabel;
 if(item.id === store.renaming) {
  itemTitle = `<input id='rename-field' type='text' value='${item.name}'>`;
  renameLabel = 'cancel';
 }
 else{
  itemTitle=item.name;
  renameLabel= ' edit'
 }
 return 
 `<li class='js-item-element' data-item-id='${item.id}'>
 <span class='shopping-item${item.checked ? ' shopping-item__checked' : ''}'>${itemTitle}</span>
 <div class='shopping-item-controls'>
     <button class='shopping-item-toggle js-item-toggle'>
       <span class='button-label'>check</span>
     </button>
     <button class='shopping-item-rename js-item-rename'>
       <span class='button-label'>${renameLabel}</span>
     </button>
     <button class='shopping-item-delete js-item-delete'>
       <span class='button-label'>delete</span>
     </button>
   </div>
 </li>`;
}

const generateItemString = function (shoppingList) {
 const items = shoppingList.map ((item) => generateItemElement(item));
 return items.join('')
}

const render = ()=> {
 if(store.renaming !== null)
  commitrename();
  store.renaming = store.nextNameId;
  store.nextNameId = null;
 
  let items = [...store.items];
  if(store.hideCheckedItems) {
   items = items.filter(item => !item.checked)
  }

  const shoppingStr = generateItemString(items);

  $('.js-shopping-list').html(shoppingstr);
};

const addItemTooList = (itemName) => {
   store.items.push({id: cuid(), name: itemName, checked: false});
};

const handleNewItemSubmit = function () {
 $('#js-shopping-list-form').submit(function (e){
  e.preventDefault();
  const newItemName = $('.js-shopping-list-entry').val();
  addItemTooList(newItemName);
  render()
 });
};

