package io.jhipster.test1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Parcours.
 */
@Entity
@Table(name = "parcours")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Parcours implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle_fr", nullable = false)
    private String libelleFr;

    @NotNull
    @Column(name = "libelle_ar", nullable = false)
    private String libelleAr;

    @ManyToOne
    private Diplome diplome;

    @ManyToOne
    private Mention mention;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleFr() {
        return libelleFr;
    }

    public Parcours libelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
        return this;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public Parcours libelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
        return this;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
    }

    public Diplome getDiplome() {
        return diplome;
    }

    public Parcours diplome(Diplome diplome) {
        this.diplome = diplome;
        return this;
    }

    public void setDiplome(Diplome diplome) {
        this.diplome = diplome;
    }

    public Mention getMention() {
        return mention;
    }

    public Parcours mention(Mention mention) {
        this.mention = mention;
        return this;
    }

    public void setMention(Mention mention) {
        this.mention = mention;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Parcours parcours = (Parcours) o;
        if (parcours.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parcours.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parcours{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            "}";
    }
}
