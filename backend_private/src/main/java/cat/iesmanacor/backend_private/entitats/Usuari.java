package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="USUARI")
@Inheritance(strategy = InheritanceType.JOINED) //Es una clase pare de generalitzacio
public class Usuari implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @Column(name = "dni",unique=true, nullable = false)
    private String dni;

    private String nom;

    private String llinatge1;

    private String llinatge2;

    private String correu;

    private String contrasenya;

    @Column(columnDefinition = "BIT")
    private int eliminat;

    public Usuari() {
    }

    public Usuari(String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat) {
        this.dni = dni;
        this.nom = nom;
        this.llinatge1 = llinatge1;
        this.llinatge2 = llinatge2;
        this.correu = correu;
        this.contrasenya = contrasenya;
        this.eliminat = eliminat;
    }

    @Override
    public String toString() {
        return "Usuari{" +
                "dni='" + dni + '\'' +
                ", nom='" + nom + '\'' +
                ", llinatge1='" + llinatge1 + '\'' +
                ", llinatge2='" + llinatge2 + '\'' +
                ", correu='" + correu + '\'' +
                ", contrasenya='" + contrasenya + '\'' +
                ", eliminat=" + eliminat +
                '}';
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLlinatge1() {
        return llinatge1;
    }

    public void setLlinatge1(String llinatge1) {
        this.llinatge1 = llinatge1;
    }

    public String getLlinatge2() {
        return llinatge2;
    }

    public void setLlinatge2(String llinatge2) {
        this.llinatge2 = llinatge2;
    }

    public String getCorreu() {
        return correu;
    }

    public void setCorreu(String correu) {
        this.correu = correu;
    }

    public String getContrasenya() {
        return contrasenya;
    }

    public void setContrasenya(String contrasenya) {
        this.contrasenya = contrasenya;
    }

    public int getEliminat() {
        return eliminat;
    }

    public void setEliminat(int eliminat) {
        this.eliminat = eliminat;
    }
}
