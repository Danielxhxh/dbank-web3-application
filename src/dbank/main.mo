import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  // currentValue := 100; // We can reset the value to 100

  stable var startTime = Time.now();
  // startTime := Time.now();

  let id = 23233232; // 'let' keyword for constants.  

  // Add money.
  public func topUp(amount: Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue))
  }; //Add semicolon in the end of each function 


  // Withdraw money.
  public func withdraw(amount: Float){
    let tempValue: Float = currentValue - amount;
    if( tempValue >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }else{
      Debug.print("Not enough money.");
    }
  }; 

  // This is a QUERY, not an UPDATE as the other functions. That is why it is so much faster.
  public query func checkBalance(): async Float{
    return currentValue;
  };
  

  // Compound Interest
  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));

    startTime := currentTime;
  };
}