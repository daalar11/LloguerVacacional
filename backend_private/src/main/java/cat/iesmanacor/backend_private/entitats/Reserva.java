package cat.iesmanacor.backend_private.entitats;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "RESERVA")
public class Reserva implements Serializable {


    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRESERVA", columnDefinition = "INT")
    private Long idReserva;

    /*
    @ManyToOne
    @JoinColumn(name = "dni_client")
    private Client client;
     */

    @ManyToOne
    @JoinColumn(name = "id_propietat")
    private Propietat propietat;

    @Column(name = "data_reserva")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss a")
    private Date dataReserva;

    @Column(name = "d_arribada")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dArribada;

    @Column(name = "d_sortida")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dSortida;

    @Column(name = "copia_normes")
    private String copiaNormes;

    @Column(name = "preu_final")
    private float preuFinal;

    private boolean cancelada;

    //Constructor buit
    public Reserva() {}

    //Getters i Setters


    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    public Propietat getPropietat() {
        return propietat;
    }

    public void setPropietat(Propietat propietat) {
        this.propietat = propietat;
    }

    public Date getDataReserva() {
        return dataReserva;
    }

    public void setDataReserva(Date dataReserva) {
        this.dataReserva = dataReserva;
    }

    public LocalDate getdArribada() {
        return dArribada;
    }

    public void setdArribada(LocalDate dArribada) {
        this.dArribada = dArribada;
    }

    public LocalDate getdSortida() {
        return dSortida;
    }

    public void setdSortida(LocalDate dSortida) {
        this.dSortida = dSortida;
    }

    public String getCopiaNormes() {
        return copiaNormes;
    }

    public void setCopiaNormes(String copiaNormes) {
        this.copiaNormes = copiaNormes;
    }

    public float getPreuFinal() {
        return preuFinal;
    }

    public void setPreuFinal(float preuFinal) {
        this.preuFinal = preuFinal;
    }

    public boolean isCancelada() {
        return cancelada;
    }

    public void setCancelada(boolean cancelada) {
        this.cancelada = cancelada;
    }

    //Metode toString

    @Override
    public String toString() {
        return "Reserva{" +
                "idReserva=" + idReserva +
                ", propietat=" + propietat +
                ", dataReserva=" + dataReserva +
                ", dArribada=" + dArribada +
                ", dSortida=" + dSortida +
                ", copiaNormes='" + copiaNormes + '\'' +
                ", preuFinal=" + preuFinal +
                ", cancelada=" + cancelada +
                '}';
    }
}
