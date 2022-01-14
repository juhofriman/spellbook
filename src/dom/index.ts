import { Component } from '../components'

export const addClass = ({ node }: Component, clazz: string) => node.classList.add(clazz)

export const addClasses = (component: Component, ...clazz: string[]) => 
  clazz.forEach(c => addClass(component, c))
