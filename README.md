# PROJET SIGN TO BLOCKCHAIN 

the goal of this project is to discover the blockchain infrastructure wit EVM and c
create a reliable system for permit to anyone to prove is document in the ethereum

based on a hackaton [DROPBOX SIGNIN]() I aim to create a beautiful product and simple,
like anyone can use.

I use TDD ( you can see it with the /tests directory) and follow the @unclebob pattern like
clean architecture 

## MAIN LEARNING TDD 

Test Driven Development is a major test system for create reliable software and easy to debug
it's easy to debug afterward the program and choose the best solution. 
TDD also it's super easy and you can, debug in less times than if you have to debug all of you software with a debugger

## ACCURATE CLEAN ARCHITECTURE 

I choose clean architecture, it's the best system in case of multiple dependencies, with dependency injection
(look at /constructor) you can init all of you class in only one files 

also, it should be the major system for create software, due to soft dependency constraint: any dependency is not lock 
to all others/ SO you can change them any time ( I can change web3js to etherjs and add a blockchain like solana easily
without the need to rebuild everything) 




