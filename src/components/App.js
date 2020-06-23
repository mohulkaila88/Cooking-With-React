import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import uuidv4 from 'uuid/v4'

export const RecipeContext = React.createContext()

const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 0,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id){
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value ={recipeContextValue}>
      <RecipeList recipes = {recipes} />
      {selectedRecipe && <RecipeEdit recipe = {selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 4,
    cookTime: '1:45',
    instructions: '1. Put salt on Chicken\n2. Put chicken in Oven\n3. Eat Chicken',
    ingredients : [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 3,
    cookTime: '3:45',
    instructions: '1. Put paprika on Pork\n2. Put pork in Oven\n3. Eat pork',
    ingredients : [
      {
        id: 1,
        name: 'Pork',
        amount: '4 Pounds'
      },
      {
        id: 2,
        name: 'Paprike',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;
