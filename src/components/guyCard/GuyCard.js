import React, { Component } from 'react'
import styles from "./styles.css"

export default class GuyCard extends Component {
  render() {
    let {dna} = this.props.data
    return (
      <div className={styles.container}>
        {dna} 
      </div>
    )
  }
}