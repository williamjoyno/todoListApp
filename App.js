import React, { useState } from "react"; 
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, } from "react-native"; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

  
const App = () => { 
    const [task, setTask] = useState(""); 
    const [tasks, setTasks] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1);     
    const [comtasks, setComTasks] = useState([]); 
  
    const handleAddTask = () => { 
        if (task) { 
            if (editIndex !== -1) { 
                const updatedTasks = [...tasks]; 
                updatedTasks[editIndex] = task; 
                setTasks(updatedTasks); 
                setEditIndex(-1); 
            } else { 
                setTasks([task, ...tasks]); 
            } 
            setTask(""); 
        } 
    }; 
  
    const handleEditTask = (index) => { 
        const taskToEdit = tasks[index]; 
        setTask(taskToEdit); 
        setEditIndex(index); 
    }; 
  
    const handleDeleteTask = (index) => { 
        const updatedTasks = [...tasks]; 
        updatedTasks.splice(index, 1); 
        setTasks(updatedTasks); 
    }; 

    
    const handleCompleteTask = (index) => {         
        const updatedTasks = [...tasks]; 
        updatedTasks.splice(index, 1); 
        setTasks(updatedTasks); 
        
        const completedTasks = tasks[index];  
        setComTasks([completedTasks, ...comtasks]); 
    }; 

    const renderItem = ({ item, index }) => ( 
        <View style={styles.task}>
            <TouchableOpacity 
                onPress={() => handleCompleteTask(index)}> 
                <Feather name="check-square" size={24} color="green" />
            </TouchableOpacity> 
            <Text 
                style={styles.itemList}>{item}</Text> 
            <View 
                style={styles.taskButtons}> 
                <TouchableOpacity 
                    onPress={() => handleEditTask(index)}> 
                    <Feather name="edit" size={24} color="black" />
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress={() => handleDeleteTask(index)}> 
                    <MaterialIcons style={{marginLeft: 10}} name="delete-outline" size={24} color="red" />
                </TouchableOpacity> 
            </View> 
        </View> 
    ); 
  
    const renderComItem = ({ item, index }) => ( 
        <View style={styles.comtask}>
            <Text 
                style={styles.itemComList}>{item}</Text> 
        </View> 
    ); 
  
    return ( 
        <View style={styles.container}> 
            {/* <Text style={styles.heading}>Cristy Jean Labadan Goc-ong</Text>  */}
            <Text style={styles.title}>ToDo App</Text> 
            <TextInput 
                style={styles.input} 
                placeholder="Enter task"
                value={task} 
                onChangeText={(text) => setTask(text)} 
            /> 
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddTask}> 
                <Text style={styles.addButtonText}> 
                    {editIndex !== -1 ? "Update Task" : "Add Task"} 
                </Text> 
            </TouchableOpacity> 
            <View style={styles.container2}>
              <FlatList 
                  data={tasks} 
                  renderItem={renderItem} 
                  keyExtractor={(item, index) => index.toString()} 
              /> 
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.title}>Completed Tasks</Text>
             
              <FlatList 
                  data={comtasks} 
                  renderItem={renderComItem} 
                  keyExtractor={(item, index) => index.toString()} 
              /> 
            </View>
        </View>         
    ); 
}; 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 20, 
        marginTop: 60, 
    }, 
    container2: {
    flex: 1, 
    marginBottom: 20, 
    },
    bottomView: {
      height: 280,
    },
    title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20, 
    }, 
    heading: { 
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 7, 
        color: "green", 
    }, 
    input: { 
        borderWidth: 3, 
        borderColor: "#ccc", 
        padding: 10, 
        marginBottom: 10, 
        borderRadius: 10, 
        fontSize: 18, 
    }, 
    addButton: { 
        backgroundColor: "green", 
        padding: 10, 
        borderRadius: 5, 
        marginBottom: 20, 
    }, 
    addButtonText: { 
        color: "white", 
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 18, 
    }, 
    task: { 
        backgroundColor: "#8e94bb", 
        borderRadius: 5, 
        padding: 10, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 10, 
        fontSize: 18, 
    }, 

    comtask: { 
      backgroundColor: "#80ff80", 
      borderRadius: 5, 
      padding: 10, 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: 10, 
      fontSize: 18, 
  }, 

  itemList: { 
    fontSize: 19, 
}, 


itemComList: { 
  fontSize: 19, 
  textDecorationLine: 'line-through',
}, 

    taskButtons: { 
        flexDirection: "row", 
    }, 
    editButton: { 
        marginRight: 10, 
        color: "green", 
        fontWeight: "bold", 
        fontSize: 18, 
    }, 
    deleteButton: { 
        color: "red", 
        fontWeight: "bold", 
        fontSize: 18, 
    }, 
}); 
  
export default App;