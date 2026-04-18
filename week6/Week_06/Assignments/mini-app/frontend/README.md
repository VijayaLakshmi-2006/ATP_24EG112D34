steps to follow 








# state magement
  sharing state + passing data between components


 context api - small apps
 redux/zustand - large apps 
                        cant send state directly from root to C/D/E/F so we use context api or redux/zustand
                        Root
                        / \
                       A   B
                      / \ / \
                     C  D E  F



# context api
   -create context(pipeline)
   -provide context  or add to the state context(attach pipeline to root)
   -set this provider to the parent
   -consume context(take data from pipeline)
 
issuses with context api
  -re-render issue
  -performance issue
context with useStatehook is best and simple state management mechanism for small apps.But it creates uncessary re-rendering issuses when multiple components are consuming the context.To overcome this uncessary re-rendering issuse,create multiple context and each context should have only one state.
When application size is huge,then maintaince of multiple context will become an issue.For such large application advanced state management libraries like redux/zustand are recommended.

# Advanced state management
  (Zustand)
  -install zustand npm install zustand
  -create a global store
   function createStore(set){
    return{
      counter:0,
      changeCounter:()=>set((state)=>({counter:state.counter+1}))
    }
   }
 