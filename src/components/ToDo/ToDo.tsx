import { Button, Group, List, Stack, Text, TextInput, Title } from '@mantine/core';
import classes from './ToDo.module.css';
import { useEffect, useState } from 'react';

export function ToDo() {

  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('toDoItems');
    if (savedItems) {
      setToDoItems(JSON.parse(savedItems));
    }
  }, []);

  const [newItemDescription, setNewItemDescription]=useState('');

  const checkItem = (item: ToDoItem) => {
    setToDoItems((prevItems) =>
      prevItems.map((currentItem) =>
        currentItem === item
          ? { ...currentItem, checked: !currentItem.checked }
          : currentItem
      )
    );
  };

  const deleteItem = (index: number) => {
    setToDoItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const addItem =() =>{
    const newItem: ToDoItem = { checked: false, description: newItemDescription.trim() };
    setToDoItems((prevItems) => [...prevItems, newItem]);
    setNewItemDescription('');
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newItemDescription.trim().length!==0)  {
     addItem();
    }
  };


  useEffect(() => {
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  }, [toDoItems]);

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          ToDo
        </Text>
      </Title>
    
      <Stack align='center'>
      <List>
      {toDoItems.map((item, index)=>(
          <List.Item onClick={()=>checkItem(item)} key={'todoitem'+index} className={classes.item}>
            <Group>
            <Text td={item.checked?'line-through':''}>{item.description} </Text>  
            <Button size="compact-xs" onClick={() => deleteItem(index)}>Delete</Button>
            </Group>
          </List.Item>
          )
        )
        }
        </List>
        <Group>
        <TextInput placeholder="Add To Do" value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)} onKeyDown={handleEnter}/>
        <Button size="add" disabled={newItemDescription.trim().length===0} onClick={() => addItem()}>Add</Button>
        </Group>
        </Stack>

    </>
  );
}
