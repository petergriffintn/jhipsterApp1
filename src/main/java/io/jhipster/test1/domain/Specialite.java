package io.jhipster.test1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import io.jhipster.test1.domain.enumeration.TypeSpecialite;

/**
 * A Specialite.
 */
@Entity
@Table(name = "specialite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Specialite implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypeSpecialite type;

    @OneToOne
    @JoinColumn(unique = true)
    private Etablissement etablissement;

    @ManyToOne
    private Parcours parcours;

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

    public Specialite libelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
        return this;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public Specialite libelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
        return this;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
    }

    public TypeSpecialite getType() {
        return type;
    }

    public Specialite type(TypeSpecialite type) {
        this.type = type;
        return this;
    }

    public void setType(TypeSpecialite type) {
        this.type = type;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public Specialite etablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
        return this;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Parcours getParcours() {
        return parcours;
    }

    public Specialite parcours(Parcours parcours) {
        this.parcours = parcours;
        return this;
    }

    public void setParcours(Parcours parcours) {
        this.parcours = parcours;
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
        Specialite specialite = (Specialite) o;
        if (specialite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), specialite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Specialite{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
