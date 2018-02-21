package io.jhipster.test1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import io.jhipster.test1.domain.enumeration.TypeUe;

import io.jhipster.test1.domain.enumeration.Qualification;

import io.jhipster.test1.domain.enumeration.RegimeExamen;

import io.jhipster.test1.domain.enumeration.Nature;

/**
 * A Ue.
 */
@Entity
@Table(name = "ue")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypeUe type;

    @Enumerated(EnumType.STRING)
    @Column(name = "qualif")
    private Qualification qualif;

    @Enumerated(EnumType.STRING)
    @Column(name = "regime")
    private RegimeExamen regime;

    @Enumerated(EnumType.STRING)
    @Column(name = "nature")
    private Nature nature;

    @ManyToOne
    private Programme programme;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Ue nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public TypeUe getType() {
        return type;
    }

    public Ue type(TypeUe type) {
        this.type = type;
        return this;
    }

    public void setType(TypeUe type) {
        this.type = type;
    }

    public Qualification getQualif() {
        return qualif;
    }

    public Ue qualif(Qualification qualif) {
        this.qualif = qualif;
        return this;
    }

    public void setQualif(Qualification qualif) {
        this.qualif = qualif;
    }

    public RegimeExamen getRegime() {
        return regime;
    }

    public Ue regime(RegimeExamen regime) {
        this.regime = regime;
        return this;
    }

    public void setRegime(RegimeExamen regime) {
        this.regime = regime;
    }

    public Nature getNature() {
        return nature;
    }

    public Ue nature(Nature nature) {
        this.nature = nature;
        return this;
    }

    public void setNature(Nature nature) {
        this.nature = nature;
    }

    public Programme getProgramme() {
        return programme;
    }

    public Ue programme(Programme programme) {
        this.programme = programme;
        return this;
    }

    public void setProgramme(Programme programme) {
        this.programme = programme;
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
        Ue ue = (Ue) o;
        if (ue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ue{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", type='" + getType() + "'" +
            ", qualif='" + getQualif() + "'" +
            ", regime='" + getRegime() + "'" +
            ", nature='" + getNature() + "'" +
            "}";
    }
}
