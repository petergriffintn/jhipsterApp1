package io.jhipster.test1.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "diplome")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Diplome implements Serializable {

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

    public Diplome libelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
        return this;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public Diplome libelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
        return this;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
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
        Diplome diplome = (Diplome) o;
        if (diplome.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diplome.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Diplome{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            "}";
    }
}
