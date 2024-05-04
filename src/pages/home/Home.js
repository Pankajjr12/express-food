import React from 'react'
import Banner from '../../components/Banner'
import Category from '../category/Category.jsx'
import SpecialDishes from '../dishes/SpecialDishes.jsx'
import Testmonial from './Testmonial.js'
import OurServices from '../services/OurServices.js'
const Home = () => {
  return (
    <div>
      <Banner/>
      <Category/>
      <SpecialDishes/>
      <Testmonial/>
      <OurServices/>
    </div>
  )
}

export default Home
