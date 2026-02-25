 import { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [userMeal, setUserMeal] = useState("")
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMeals(e) {
    e.preventDefault()

    try {
      setLoading(true)

      const mealRes = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${userMeal}`
      )

      setMeals(mealRes.data.meals || [])
    } catch (err) {
      alert("Something Went Wrong Try Again Later")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-gray-900 p-4 shadow-md">
        <h1 className="text-white text-2xl font-bold text-center">
          🍽 Meal Finder App
        </h1>
      </nav>

      {/* Search Section */}
      <form
        onSubmit={getMeals}
        className="flex justify-center gap-3 mt-8"
      >
        <input
          type="text"
          placeholder="Search meal..."
          className="px-4 py-2 w-72 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setUserMeal(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-6 text-lg font-semibold">
          Searching meals...
        </p>
      )}

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {meals.map((ml) => (
          <div
            key={ml.idMeal}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <img
              src={ml.strMealThumb}
              alt={ml.strMeal}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold mb-2">
                {ml.strMeal}
              </h2>

              <p className="text-gray-600 mb-3">
                {ml.strCategory} • {ml.strArea}
              </p>

              {ml.strTags && (
                <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">
                  {ml.strTags}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Result */}
      {!loading && meals.length === 0 && userMeal && (
        <p className="text-center text-gray-600 text-lg">
          No meals found 😢
        </p>
      )}
    </div>
  )
}

export default App