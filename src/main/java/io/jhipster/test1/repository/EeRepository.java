package io.jhipster.test1.repository;

import io.jhipster.test1.domain.Ee;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EeRepository extends JpaRepository<Ee, Long> {

}
