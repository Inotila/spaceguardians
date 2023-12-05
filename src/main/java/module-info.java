module com.example.projecthangman {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.projecthangman to javafx.fxml;
    exports com.example.projecthangman;
}