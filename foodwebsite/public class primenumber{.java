public class primenumber{
     public static void main(String []args){

        int number = 63;
        System.out.println("your given number is " + number);
        int count=0;

        for(i=0; i<number.length; i++){
            if(number%i==0)
            count++;
        }
        if(count==2){
            System.out.println("Number"+ number +"is prime number");
        }
        else{
            System.out.println("Number"+ number +"is not a prime number");
        }
     }
}