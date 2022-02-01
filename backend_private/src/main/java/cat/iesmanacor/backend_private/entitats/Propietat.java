package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity //Entitat (se menejara amb una taula)
@Table(name="PROPIETAT") //Si la taula no s'escriu exactament igual a la classe s'ha de posar el nom de la taula (NO ES EL CAS)
public class Propietat implements Serializable {

    private static final long serialVersionUID=1L;

    @Id //Indicam quin es el camp identificador
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    @Column(columnDefinition = "INT")
    private Long idPROPIETAT;

    @Column(name="nom_propietat", nullable=false)
    private String nomPropietat;

    @ManyToOne //Relacio de molts a un ambn la taula municipi
    @JoinColumn(name = "id_localitat") //Especificam el nom de la taula
    private Localitat localitat;

    private String normes;

    //One to many para poder leer las habitaciones de una propietat
    @OneToMany(mappedBy = "propietat")
    private List<Habitacio> habitacions;

    @OneToMany(mappedBy = "propietat")
    private List<Tarifa> tarifes;

    @OneToMany(mappedBy = "propietat")
    private List<PoliticaCancelacio> politica;

    @OneToMany(mappedBy = "propietat")
    private List<Bloqueig> bloqueig;

    @OneToMany(mappedBy = "propietat")
    private List<Reserva> reserves;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name= "caracteristiques_propietats",
            joinColumns = @JoinColumn(name="id_pro"),
            inverseJoinColumns = @JoinColumn(name="id_car"))
    private List<Caracteristica> caracteristicas = new ArrayList<>();

    private String direccio;

    @Column(name = "banys_propietat")
    private int banysPropietat;

    @NotNull
    @Column(name="preu_base", nullable=false)
    private int preuBase;

    @NotNull
    @Column(name="descompte_setmana", nullable=false)
    private int descompteSetmana;

    @NotNull
    @Column(name="descompte_mes", nullable=false)
    private int descompteMes;

    private String x;
    private String y;

    //Constructor buit
    public Propietat() {}

    //Getters i Setters
    public Long getIdPROPIETAT() {
        return idPROPIETAT;
    }
    public void setIdPROPIETAT(Long idPROPIETAT) {
        this.idPROPIETAT = idPROPIETAT;
    }
    public String getNomPropietat() {
        return nomPropietat;
    }
    public void setNomPropietat(String nomPropietat) {
        this.nomPropietat = nomPropietat;
    }
    public Localitat getLocalitat() {
        return localitat;
    }
    public void setLocalitat(Localitat localitat) {
        this.localitat = localitat;
    }
    public String getNormes() {
        return normes;
    }
    public void setNormes(String normes) {this.normes = normes;}
    public List<Habitacio> getHabitacions() {
        return habitacions;
    }
    public void setHabitacions(List<Habitacio> habitacions) {
        this.habitacions = habitacions;
    }
    public List<Tarifa> getTarifes() {
        return tarifes;
    }
    public void setTarifes(List<Tarifa> tarifes) {
        this.tarifes = tarifes;
    }
    public List<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }
    public void setCaracteristicas(List<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }
    public String getDireccio() {return direccio;}
    public void setDireccio(String direccio) {
        this.direccio = direccio;
    }

    public int getBanysPropietat() {
        return banysPropietat;
    }

    public void setBanysPropietat(int banysPropietat) {
        this.banysPropietat = banysPropietat;
    }

    public int getPreuBase() {
        return preuBase;
    }
    public void setPreuBase(int preuBase) {this.preuBase = preuBase;}
    public int getDescompteSetmana() {
        return descompteSetmana;
    }
    public void setDescompteSetmana(int descompteSetmana) {
        this.descompteSetmana = descompteSetmana;
    }
    public int getDescompteMes() {
        return descompteMes;
    }
    public void setDescompteMes(int descompteMes) {
        this.descompteMes = descompteMes;
    }
    public List<Bloqueig> getBloqueig() {
        return bloqueig;
    }
    public void setBloqueig(List<Bloqueig> bloqueig) {
        this.bloqueig = bloqueig;
    }
    public List<PoliticaCancelacio> getPolitica(){
        return politica;
    }
    public void setPolitica(List<PoliticaCancelacio> politica){
        this.politica=politica;
    }
    public String getX() {
        return x;
    }
    public void setX(String x) {
        this.x = x;
    }
    public String getY() {
        return y;
    }
    public void setY(String y) {
        this.y = y;
    }
}