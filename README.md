# Neural Network

A plugin package for Data Science Lab by Cobe Greene.

Plugins include:
* Feed-Forward Neural Network
* Pack Numbers Feature
* Unpack Numbers Feature
* Array Scale

## Feed-Forward Neural Network

![FFNN](https://cs.stanford.edu/people/eroberts/courses/soco/projects/neural-networks/Architecture/images/feedforward.jpg)

Plugin Inputs:
* Input Features - one number[]
* Output Feature - one number

__Input Features__ is an array of numbers that is preferably between 0 and 1. If not, then it could take longer to train. The array of numbers could represent features for a .csv file or pixel data from an image.

__Output Feature__ is an integer that is labels the input features.

## Pack Numbers Feature

Plugin Inputs:
* Features to pack - one or many number

__Features to pack__ takes many features and converts them into a number[]. For example, feature 1 and feature 2 will be converted into [feature 1, feature 2]. 

## Unpack Numbers Feature

Plugin Inputs:
* Features to unpack - one number[]

__Features to unpack__ takes a number[], and converts it into individual features. For example, [feature 1, feature 2] will be converted into two seperate feature 1 and feature 2.

## Array Scale

Plugin Inputs:
* Feature Array to Scale - one number[]

__Feature Array to Scale__ takes a number[] and scales each individual number by a scale factor that is given in the plugin options. 

